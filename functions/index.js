const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require('nodemailer');
admin.initializeApp();


const generatePassword = () => {
  return Math.random().toString(36).slice(-8); // Simple password generator
};


// Retrieve the email credentials from Firebase environment variables
const gmailEmail = functions.config().email.user;
const gmailPassword = functions.config().email.pass;

// Configure the transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

exports.onEmployeeCreate = functions.firestore
    .document("users/{userid}")
    .onCreate(async (snap, context) => {
      const newValue = snap.data();
      const email = newValue.email;
      const password = 'test123'
      const departmentId = newValue.department.value; 

      try {
        const userRecord = await admin.auth().createUser({
          email: email,
          password: password,
          displayName:`${newValue.firstname} ${newValue.lastname}`
        });
        // Update the employee document in Firestore with the UID
        await admin.firestore().collection("users").doc(context.params.userid).update({
          uid: userRecord.uid
        });
        console.log("Successfully created new user:", userRecord.uid);

        // Update the department count
      const departmentRef = admin.firestore().collection("departments").doc(departmentId);
      await admin.firestore().runTransaction(async (transaction) => {
        const departmentDoc = await transaction.get(departmentRef);
        if (!departmentDoc.exists) {
          throw "Department document does not exist!";
        }

        const newCount = (departmentDoc.data().count || 0) + 1;
        transaction.update(departmentRef, { count: newCount });
      });

        // Send welcome email
        const mailOptions = {
          from: `HR App`,
          to: email,
          subject: 'Welcome to Our App',
          text: `Hello ${newValue.firstname}, welcome to our app!`,
          html: `<p>Hello ${newValue.firstname},</p><p>Welcome to our app!</p>`,
        };
  
        await transporter.sendMail(mailOptions);
        console.log('Welcome email sent successfully');

      } catch (error) {
        console.error("Error creating new user:", error);
      }

      return null;
    });


exports.onEmployeeUpdate = functions.firestore
  .document("users/{userid}")
  .onUpdate(async (change, context) => {
    const before = change.before.data();
    const after = change.after.data();

    // Check if the email has changed
    if (before.email !== after.email) {
      const newEmail = after.email;
      const uid = before.uid

      try {
        const userRecord = await admin.auth().updateUser(uid, {
          email: newEmail
        });
        console.log("Successfully updated user email:", userRecord.uid);
      } catch (error) {
        console.error("Error updating user email:", error);
      }

      
    }

    // Check if empstatus.label is 'Resigned' or 'Terminated'
    if (after.empstatus && ['Resigned', 'Terminated'].includes(after.empstatus.label)) {
      try {
        // Format the current date to dd-mm-yyyy
        const currentDate = new Date();
        const formattedDate = `${('0' + currentDate.getDate()).slice(-2)}-${('0' + (currentDate.getMonth() + 1)).slice(-2)}-${currentDate.getFullYear()}`;

        // Update the dateexiting field to the formatted current date
        await admin.firestore().collection('users').doc(context.params.userid).update({
          dateexiting: formattedDate,
        });
        console.log("Successfully updated dateexiting field for user:", uid);

         // Reduce the count of the user's department
         if (before.department && before.department.value) {
          const departmentRef = admin.firestore().collection('departments').doc(before.department.value);
          await departmentRef.update({
            count: admin.firestore.FieldValue.increment(-1),
          });
          console.log("Successfully reduced employee count for department:", before.department.value);
        }

        // Delete the user from Firebase Authentication
        await admin.auth().deleteUser(uid);
        console.log("Successfully deleted user:", uid);
      } catch (error) {
        console.error("Error updating user or deleting user:", error);
      }
    }


    

    // Check if the department has changed
    if (before.department.value !== after.department.value) {
      const prevDepartmentId = before.department.value;
      const newDepartmentId = after.department.value;

      const prevDepartmentRef = admin.firestore().collection("departments").doc(prevDepartmentId);
      const newDepartmentRef = admin.firestore().collection("departments").doc(newDepartmentId);

      try {
        await admin.firestore().runTransaction(async (transaction) => {
          const prevDepartmentDoc = await transaction.get(prevDepartmentRef);
          const newDepartmentDoc = await transaction.get(newDepartmentRef);

          if (prevDepartmentDoc.exists) {
            const newPrevCount = (prevDepartmentDoc.data().count || 0) - 1;
            transaction.update(prevDepartmentRef, { count: newPrevCount });
          } else {
            console.warn("Previous department document does not exist:", prevDepartmentId);
          }

          if (newDepartmentDoc.exists) {
            const newNewCount = (newDepartmentDoc.data().count || 0) + 1;
            transaction.update(newDepartmentRef, { count: newNewCount });
          } else {
            console.warn("New department document does not exist:", newDepartmentId);
          }
        });

        console.log(`Updated department counts for previous: ${prevDepartmentId} and new: ${newDepartmentId}`);
      } catch (error) {
        console.error("Error updating department counts:", error);
      }
    }

    

    return null;
  });


  exports.onEmployeeDelete = functions.firestore
  .document('users/{userid}')
  .onDelete(async (snap, context) => {
    const deletedValue = snap.data();
    const uid = deletedValue.uid;

    try {
      await admin.auth().deleteUser(uid);
      console.log('Successfully deleted user:', uid);
        // Reduce the count of the user's department
        if (deletedValue.department && deletedValue.department.value) {
          const departmentRef = admin.firestore().collection('departments').doc(deletedValue.department.value);
          await departmentRef.update({
            count: admin.firestore.FieldValue.increment(-1),
          });
          console.log('Successfully reduced employee count for department:', deletedValue.department.value);
        }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  });





    exports.updateAnnualLeaveOnApproval = functions.firestore
    .document('leave/{leaveId}')
    .onUpdate(async (change, context) => {
        const before = change.before.data();
        const after = change.after.data();

        // Check if the status has changed to "Approved"
        if (before.status !== 'Approved' && after.status === 'Approved') {
            const { uid, firstDate, lastDate } = after;
            const leaveDays = calculateLeaveDays(firstDate, lastDate);

            try {
                // Query to find the employee document by uid
                const employeesRef = admin.firestore().collection('employees');
                const query = employeesRef.where('uid', '==', uid);
                const querySnapshot = await query.get();

                if (querySnapshot.empty) {
                    throw new Error("No employee found with the provided UID");
                }

                // Assuming uid is unique, so there will be only one document in the result
                const employeeDoc = querySnapshot.docs[0];
                const employeeRef = employeeDoc.ref;
                const currentAnnualLeave = employeeDoc.data().annualleave || 0;
                const newAnnualLeave = currentAnnualLeave - leaveDays;

                await employeeRef.update({
                    annualleave: newAnnualLeave
                });

                console.log(`Annual leave updated for employee with UID ${uid}`);
            } catch (error) {
                console.error("Error updating annual leave: ", error);
            }
        }
    });

// Helper function to calculate the number of leave days
function calculateLeaveDays(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    // Assuming leave days are inclusive of both start and end dates
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    const days = Math.round((end - start) / millisecondsPerDay) + 1;
    return days;
}



exports.onCompanyCreate = functions.firestore
  .document('companies/{companyId}')
  .onCreate(async (snap, context) => {
    const newCompany = snap.data();
    const superAdminId = newCompany.superadminid;
    const companyId = context.params.companyId;

    try {
      // Update the user document in Firestore with the company ID
       // Query to find the employee document by uid
       const employeesRef = admin.firestore().collection('users');
       const query = employeesRef.where('uid', '==', superAdminId);
       const querySnapshot = await query.get();

       if (querySnapshot.empty) {
           throw new Error("No employee found with the provided UID");
       }

       // Assuming uid is unique, so there will be only one document in the result
       const employeeDoc = querySnapshot.docs[0];
       const userRef = employeeDoc.ref;
       
      await userRef.update({
        companyId: companyId
      });

      console.log(`Successfully updated user ${superAdminId} with company ID ${companyId}`);
    } catch (error) {
      console.error("Error updating user with company ID:", error);
    }

    return null;
  });

export const getDate=()=>{

 // Get today's date
 const today = new Date();

 // Define options for formatting the date
 const options = { weekday: 'short', day: '2-digit', month: 'short' };

 // Format the date
 const formattedDate = today.toLocaleDateString('en-US', options);

 return formattedDate;

}


export const getTime=()=>{
    const currentTime = new Date();

    const timeOptions = { hour: 'numeric', minute: '2-digit', hour12: true };

    // Format the time
    const formattedTime = currentTime.toLocaleTimeString('en-US', timeOptions);

    return formattedTime

}


export function getCurrentDateFormatted() {
    // Define options for date formatting
    const options = { day: 'numeric', month: 'short', year: 'numeric' };

    // Get the current date and format it using toLocaleDateString
    return new Date().toLocaleDateString('en-GB', options);
}




export const convertToDateFormat = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };




export function getCurrentDate() {
    const today = new Date();
    const yyyy_mm_dd = today.toISOString().slice(0,10);
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    const dd_mm_yyyy = dd + '-' + mm + '-' + yyyy;
    return { yyyy_mm_dd, dd_mm_yyyy };
  }


  export function calculateTimeDifference(startTime, endTime) {
    // Function to parse a time string (e.g., "8:30 AM") into a Date object
    const parseTime = (timeString) => {
      const [time, modifier] = timeString.split(/(AM|PM)/i);
      let [hours, minutes] = time.split(':').map(Number);
  
      if (modifier.toUpperCase() === 'PM' && hours !== 12) {
        hours += 12;
      } else if (modifier.toUpperCase() === 'AM' && hours === 12) {
        hours = 0;
      }
  
      const date = new Date();
      date.setHours(hours, minutes, 0, 0);
  
      return date;
    };
  
    const startDate = parseTime(startTime);
    const endDate = parseTime(endTime);
  
    const diffInMilliseconds = endDate - startDate;
    const diffInHours = diffInMilliseconds / (1000 * 60 * 60);
  
    return diffInHours;
  }
  


  export const parseDate = (dateString) => {
    const [day, month, year] = dateString.split('-');
    return new Date(Date.UTC(year, month - 1, day));// month - 1 because months are 0-indexed in JavaScript dates
  };
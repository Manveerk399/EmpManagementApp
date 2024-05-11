export const getDate=()=>{

// Get today's date
const today = new Date();

// Define options for formatting the date
const options = { day: '2-digit', month: 'short', year: 'numeric' };

// Format the date
const formattedDate = today.toLocaleDateString('en-US', options);
return formattedDate

}


export const getTime=()=>{
    const currentTime = new Date();

    const timeOptions = { hour: 'numeric', minute: '2-digit', hour12: true };

    // Format the time
    const formattedTime = currentTime.toLocaleTimeString('en-US', timeOptions);

    return formattedTime

}
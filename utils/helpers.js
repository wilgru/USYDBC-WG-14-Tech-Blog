module.exports = {
    // The custom helper 'format_date' takes in a timestamp
    format_date: (date) => {
        const newDate = new Date(date);
        return `${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()}`;
    },
};

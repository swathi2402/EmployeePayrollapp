const stringifyDate = (date) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const newDate = !date ? "undefined" : new Date(Date.parse(date)).toLocaleDateString('en-GB', options);
    return newDate;
}

const checkName = (name) => {
  let nameRegex = RegExp('^[A-Z]{1}[a-z]{2,}$')
      if(!nameRegex.test(name)) 
          throw 'Name is incorrect';
}

const checkStartDate = (startDate) => {
  let now = new Date();
      if (startDate > now) 
          throw 'Start date is future date';
      let oneMonthSpan = new Date();
      oneMonthSpan.setDate(oneMonthSpan.getDate() - 30);
      if (startDate < oneMonthSpan)
          throw 'Start date is beyond 30 days';
}
var birthDate = document.querySelector("#date-input");
var checkBtn = document.querySelector("#show-btn");
var outputEl = document.querySelector("#result");
const daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const daysInMonthsLeap = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function clearmsg() {
    outputEl.innerText = "";
    outputEl.style.display = "none"
}

function dateHandler() {
    clearmsg()
    if (birthDate.value != "") {

        checkIsPalindrome();

    } else {
        outputEl.style.display = "block"
        outputEl.innerText = "Please fill the date field to find out."
    }
}

function checkIsPalindrome() {
    var bDateArr = birthDate.value.split("-");
    var inputYear = bDateArr[0];
    var inputMonth = bDateArr[1];
    var inputDate = bDateArr[2];
    var checked = checkAllCombination(inputYear, inputMonth, inputDate);

    if (checked) {
        outputEl.style.display = "block"
        outputEl.innerText = "Yayy, Guess what!! Your birthdate in the format " + checked + " is palindrome 🥳🥳."
    } else {
        var [nextdate, diff] = nearestDate(inputDate, inputMonth, inputYear);
        outputEl.style.display = "block"
        outputEl.innerText = "Awww! Your birthdate is not palindrome. Nearest palindrome date is " +
            nextdate + ". You missed it by " + diff + " days 😔."

    }
}

function checkAllCombination(yyyy, mm, dd) {
    //yyyymmdd
    var dateFormat1 = yyyy + mm + dd;

    //ddmmyyyy 
    var dateFormat2 = dd + mm + yyyy;

    //mmddyy 
    var dateFormat3 = mm + dd + yyyy.substring(2);


    //mmddyyyy 
    var dateFormat4 = mm + dd + yyyy;


    //ddmmyy
    var dateFormat5 = dd + mm + yyyy.substring(2);


    if (isPalindrome(dateFormat1)) {
        return (`${yyyy}-${mm}-${dd} in format yyyy-mm-dd`);
    } else if (isPalindrome(dateFormat2)) {
        return (`${dd}-${mm}-${yyyy} in format dd-mm-yyyy`);
    } else if (isPalindrome(dateFormat3)) {
        return (`${mm}-${dd}-${yyyy.substring(2)} in format mm-dd-yy`);
    } else if (isPalindrome(dateFormat4)) {
        return (`${mm}-${dd}-${yyyy} in format mm-dd-yyyy`);
    } else if (isPalindrome(dateFormat5)) {
        return (`${dd}-${mm}-${yyyy.substring(2)} in format dd-mm-yy `);
    } else {
        return false;
    }
}

function isPalindrome(combistring) {
    var mid = Math.floor(combistring.length / 2);
    for (var i = 0; i < mid; i++) {
        if (combistring[i] != combistring[combistring.length - 1 - i])
            return false;
    }
    return true;
}

//funtion to check leap year in years
function isLeapYear(year) {
    return ((year % 4 === 0) && (year % 100 !== 0) || (year % 400 === 0));
}

//functions to find nearest palindrome date
function forwardNextDate(date, month, year) {
    let yearForward = Number.parseInt(year);
    let monthForward = Number.parseInt(month);
    let dateForward = Number.parseInt(date);
    let diff = 0;
    let found = false;

    while (!found) {
        dateForward++;
        if (isLeapYear(yearForward)) {
            if (dateForward > daysInMonthsLeap[monthForward - 1]) {
                dateForward = 1;
                monthForward++;
            }
        } else {
            if (dateForward > daysInMonths[monthForward - 1]) {
                dateForward = 1;
                monthForward++;
            }
        }

        if (monthForward > 12) {
            monthForward = 1;
            yearForward = yearForward + 1;
        }

        if (yearForward > 9999) break;

        let dateString = dateForward.toString();
        let yearString = yearForward.toString();
        let monthString = monthForward.toString();

        if (dateString.length === 1) dateString = "0" + dateString;
        if (monthString.length === 1) monthString = "0" + monthString;

        if (yearString.length < 4) {
            if (yearString.length === 0) {
                yearString = "0000";
            } else if (yearString.length === 1) {
                yearString = "000" + yearString;
            } else if (yearString.length === 2) {
                yearString = "00" + yearString;
            } else if (yearString.length === 3) {
                yearString = "0" + yearString;
            }
        }

        diff++;

        var nearestPalindromeDate = checkAllCombination(yearString, monthString, dateString);
        if (nearestPalindromeDate !== false) {
            found = true;
            // console.log("Nearest forward", nearestPalindromeDate);
            break;
        }
    }
    return [nearestPalindromeDate, diff];
}

function backwardNextDate(date, month, year) {
    let yearBackward = Number.parseInt(year);
    let monthBackward = Number.parseInt(month);
    let dateBackward = Number.parseInt(date);
    let diff = 0;

    let found = false;
    while (!found) {

        if (yearBackward >= 1) {
            dateBackward--;
            if (dateBackward < 1) {
                monthBackward = monthBackward - 1;

                if (monthBackward < 1) {
                    monthBackward = 12;
                    yearBackward = yearBackward - 1;
                    if (yearBackward < 1) {
                        break;
                    }
                }
                if (isLeapYear(yearBackward)) {
                    dateBackward = daysInMonthsLeap[monthBackward - 1];
                } else {
                    dateBackward = daysInMonths[monthBackward - 1];
                }
            }
        } else {
            break;
        }

        let dateString = dateBackward.toString();
        let yearString = yearBackward.toString();
        let monthString = monthBackward.toString();

        if (yearString.length < 4) {
            if (yearString.length === 1) {
                yearString = "000" + yearString;
            } else if (yearString.length === 2) {
                yearString = "00" + yearString;
            } else if (yearString.length === 3) {
                yearString = "0" + yearString;
            }
        }

        if (dateString.length === 1) dateString = "0" + dateString;
        if (monthString.length === 1) monthString = "0" + monthString;
        diff++;

        var nearestPalindromeDate = checkAllCombination(yearString, monthString, dateString);
        if (nearestPalindromeDate !== false) {
            found = true;
            //console.log("Nearest Backward", nearestPalindromeDate);
            break;
        }
    }
    return [nearestPalindromeDate, diff];
}

function nearestDate(date, month, year) {
    let forwardDate = forwardNextDate(date, month, year);
    let backwardDate = backwardNextDate(date, month, year);
    let nearestDate = "";
    let diff = "";
    if (forwardDate[0] !== "" && backwardDate[0] !== "") {
        if (forwardDate[1] < backwardDate[1]) {
            nearestDate = forwardDate[0];
            diff = forwardDate[1];
        } else {
            nearestDate = backwardDate[0];
            diff = backwardDate[1];
        }
    }
    return [nearestDate, diff]
}

checkBtn.addEventListener("click", dateHandler)
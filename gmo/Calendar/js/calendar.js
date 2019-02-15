
/*
Author: VU BA TIEN
Project: Javascript - Calendar
*/

var inputCalendar = function() {
    var input = document.getElementById("date");
    var date = new Date();
	var month = date.getMonth();
	var year = date.getFullYear();
	var day_name = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	var month_name = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	input.addEventListener("click", show);

     /*
     * Main function To Show Calendar
     */
	function show() {
		input.removeEventListener("click", show);
		var first_date = month_name[month] + " " + 1 + " " + year;
        var tmp = new Date(first_date).toDateString(); //Tue Aug 01 2017
        var first_day = tmp.substring(0, 3); //get Day = Tue
		var day_no = day_name.indexOf(first_day); //1
        var days = new Date(year, month + 1, 0).getDate(); //30
        var calendar = get_calendar(day_no, days);

        var div = document.createElement('div');
		div.className = "block-calendar";
        div.appendChild(calendar);

		if (input.nextSibling) {
            input.parentNode.insertBefore(div, input.nextSibling);
        // In case the existingItem has no sibling after itself, append it
        } else {
            input.parentNode.appendChild(div);
        }
    }
     /*
     * Create calendar
     * @param {day no in month}
     * @param {days in month}
     * @return table Calendar
     */
	function get_calendar(day_no, days) {
        var table = document.createElement('table');
        var tr = document.createElement('tr');

        //Create button prev Year
        var td = document.createElement('td');
        var prevYear = document.createElement('button');
        prevYear.innerHTML = "<<";
        prevYear.onclick = function() {
            if (year > 1900) {
                year--;
                table.parentNode.removeChild(table);
                show();
            }
        };
        td.appendChild(prevYear);
        tr.appendChild(td);

        //create button pre Month
        td = document.createElement('td');
        var prevM = document.createElement('button');
        prevM.innerHTML = "<";
        prevM.onclick = function() {
            if (month > 0) {
                month--;
                table.parentNode.parentNode.removeChild(table.parentNode);
                show();
            }
        };
        td.appendChild(prevM);
        tr.appendChild(td);

        /*----------  Select Month, Select Year  ----------*/
        //Select Month
        td = document.createElement('td');
        var listMonth = document.createElement('select');
        listMonth.onchange = function() {
            month = parseInt(this.options[this.selectedIndex].value);
            console.log(this.options[this.selectedIndex].value + 1); //Test Select Month
            table.parentNode.parentNode.removeChild(table.parentNode);
            show();
        };

        //Select Year
        var listYear = document.createElement('select');
        listYear.onchange = function() {
            year = parseInt(this.options[this.selectedIndex].value);
            console.log(this.options[this.selectedIndex].value); //Test Select Year
            table.parentNode.parentNode.removeChild(table.parentNode);
            show();
        };
        for (var i = 0; i <= 11; i++) {
            var option = document.createElement('option');
            option.value = i;
            option.text = month_name[i];
            if (i == month) {
                option.selected = true;
            }
            listMonth.appendChild(option);
        }
        for (var j = 1950; j <= (date.getFullYear() + 50); j++) {
            var option = document.createElement('option');
            option.value = j;
            option.text = j;
            if (j == year) {
                option.selected = true;
            }
            listYear.appendChild(option);
        }
        td.appendChild(listMonth);
        td.appendChild(listYear);

        td.setAttribute("colspan", "3");
        tr.appendChild(td);

        //create button next month
        td = document.createElement('td');
        var nextM = document.createElement('button');
        nextM.innerHTML = ">";
        nextM.onclick = function() {
            if (month < 11) {
                month++;
                table.parentNode.parentNode.removeChild(table.parentNode);
                show();
            }
        };
        td.appendChild(nextM);
        tr.appendChild(td);
        table.appendChild(tr);

        //create button next year
        td = document.createElement('td');
        var nextYear = document.createElement('button');
        nextYear.innerHTML = ">>";
        nextYear.onclick = function() {
            if (year < date.getFullYear() + 50) {
                year++;
                table.parentNode.removeChild(table);
                show();
            }
        };
        td.appendChild(nextYear);
        tr.appendChild(td);

        //Print day in week
        tr = document.createElement('tr');
        for (var week_day = 0; week_day <= 6; week_day++) {
            td = document.createElement('td');
            td.innerHTML = day_name[week_day];
            td.className = "week";
            tr.appendChild(td);
        }
        table.appendChild(tr);

        //Print day empty in month
        tr = document.createElement('tr');
        var c;
        for (c = 0; c <= 6; c++) {
            if (c == day_no) {
                break;
            }
            td = document.createElement('td');
            td.innerHTML = "";
            tr.appendChild(td);
        }
        /*----------  Print day in month  ----------*/
        var count = 1;
        for (c ; c <= 6; c++) {
            td = document.createElement('td');
            if (count == date.getDate() && month == date.getMonth && year == date.getFullYear()) {
                td.style.background = "pink";
            }
            td.innerHTML = count;
            td.className = "days";
            td.onclick = choseDate;
            count++;
            tr.appendChild(td);
        }
        table.appendChild(tr);
        for (var r = 3; r <= 7; r++) {
            tr = document.createElement('tr');
            for (var c = 0; c <= 6; c++) {
                if (count > days) {
                    table.appendChild(tr);
                    return table;
                }
                td = document.createElement('td');
                if (count == date.getDate() && month == date.getMonth() && year == date.getFullYear()) {
                    td.style.cssText = 'background: aqua;';
                }
                td.innerHTML = count;
                td.className = "days";
                //event call function choseDate
                td.onclick = choseDate;
                count++;
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }
        if (listMonth.onchange = dateful) {
            alert("dung r");
        }
        /*----------  End Print day in month  ----------*/
        return table;
    }

    /*
    *Function chose Day to input element value
    */
    function choseDate() {
        var div = this.parentNode.parentNode.parentNode;
        input.value = this.innerHTML + "/" + (parseInt(month) + 1) + "/" + year;
        div.parentNode.removeChild(div);
        input.addEventListener("click", show);
    }
}
window.onload = function() {
    inputCalendar();
}
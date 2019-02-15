
/*
Author: VU BA TIEN
Project: Javascript - Calendar
*/

window.onload = function() {
    inputCalendar();
}

var inputCalendar = function() {
    var input = $("#date");
    var date = new Date();
	var month = date.getMonth();
	var year = date.getFullYear();
	var day_name = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	var month_name = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    $("#date").click(function(){
        show();
    });

     /*
     * Main function To Show Calendar
     */
	function show() {
        $("#date").off('click');
		var first_date = month_name[month] + " " + 1 + " " + year;
        var tmp = new Date(first_date).toDateString(); //Tue Aug 01 2017
        var first_day = tmp.substring(0, 3); //get Day = Tue
		var day_no = day_name.indexOf(first_day); //1
        var days = new Date(year, month + 1, 0).getDate(); //30
        var calendar = get_calendar(day_no, days);

        var txtDiv = "<div class='block-calendar'></div>"
        $("#date").after(txtDiv);
        $(".block-calendar").append(calendar);
    }

     /*
     * Create calendar
     * @param {day no in month}
     * @param {days in month}
     * @return table Calendar
     */
	function get_calendar(day_no, days) {
        var table = $("<table>");
        var tr = $("<tr>");
        var td = $("<td>");
        var prevYear = $("<button>");

        prevYear.html("<<");
        prevYear.type = "button";
        prevYear.click(function() {
            if (year > 1900) {
                year--;
                table.parent().remove();
                show();
            }
        });
        td.append(prevYear);
        tr.append(td);

        //create button prev Month
        td = $("<td>");
        var prevM = $("<button>");
        prevM.html("<");
        prevM.type = "button";
        prevM.click(function() {
            if (month > 0) {
                month--;
                table.parent().remove();
                show();
            }
        });
        td.append(prevM);
        tr.append(td);

        //Select Month
        td = $("<td>");
        var listMonth = $("<select>");
        listMonth.change(function() {
            month = parseInt(this.options[this.selectedIndex].value);
            console.log("month: " + month);
            table.parent().remove();
            show();
        });

        //Select Year
        var listYear = $("<select>");
        listYear.change(function() {
            year = parseInt(this.options[this.selectedIndex].value);
            console.log("year: "+ year);
            table.parent().remove();
            show();
        });
        for (var i = 0; i <= 11; i++) {
            var option = $("<option>");
            option.val(i);
            option.text(month_name[i]);
            if (i == month) {
                option.prop("selected", true);
            }
            listMonth.append(option);
        }
        for (var j = 1900; j <= (date.getFullYear() + 50); j++) {
            var option = $("<option>");
            option.val(j);
            option.text(j);
            if (j == year) {
                option.prop("selected", true);
            }
            listYear.append(option);
        }
        td.append(listMonth);
        td.append(listYear);
        td.attr("colspan", "3");
        tr.append(td);

        //create button next month
        td = $("<td>");
        var nextM = $("<button>");
        nextM.html(">");
        nextM.type = "button";
        nextM.click(function() {
            if (month < 11) {
                month++;
                table.parent().remove();
                show();
            }
        });

        td.append(nextM);
        tr.append(td);
        table.append(tr);

        //create button next year
        td = $("<td>");
        var nextYear = $("<button>");
        nextYear.html(">>");
        nextYear.type = "button";
        nextYear.click(function() {
            if (year < date.getFullYear() + 50) {
                year++;
                table.parent().remove();
                show();
            }
        });
        td.append(nextYear);
        tr.append(td);

        //Print day in week
        tr = $("<tr>");
        for (var week_day = 0; week_day <= 6; week_day++) {
            td = $("<td>", {"class": "week"});
            td.html(day_name[week_day]);
            td.className = "week";
            tr.append(td);
        }
        table.append(tr);

        //Print day empty in month
        tr = $("<tr>");
        var c;
        for (c = 0; c <= 6; c++) {
            if (c == day_no) {
                break;
            }
            td = $("<td>");
            td.empty();
            tr.append(td);
        }
        //Print day in month
        var count = 1;
        for (c ; c <= 6; c++) {
            td = $("<td>", {"class":"days"});
            if (count == date.getDate() && month == date.getMonth && year == date.getFullYear()) {
                td.css("background", "aqua");
            }
            td.html(count);
            td.click(function(e) {
                choseDate(e);
            });
            count++;
            tr.append(td);
        }
        table.append(tr);
        for (var r = 3; r <= 7; r++) {
            tr = $("<tr>");
            for (var c = 0; c <= 6; c++) {
                if (count > days) {
                    table.append(tr);
                    return table;
                }
                td = $("<td>", {"class":"days"});
                if (count == date.getDate() && month == date.getMonth() && year == date.getFullYear()) {
                    td.css("background", "aqua");
                }
                td.html(count);
                td.className = "days";
                td.click(function(e) {
                choseDate(e);
            });
                count++;
                tr.append(td);
            }
            table.append(tr);
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
    function choseDate(e) {
        var day = $(e.target).html();
        var div = $(e.target).closest(".block-calendar");
        var date = day + "/" + (parseInt(month) + 1) + "/" + year;
        input.val(date);
        div.remove();
        $("#date").click(function(){
            show();
        });
    }
}

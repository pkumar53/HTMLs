var curDate = new Date();
var monthArray = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];
var dayArray = ['S','M','T','W','T','F','S'];
var lastSelected;

function populateCalendarDates(month, year) {
	var dateDiv = [];
	console.log(month);
	console.log(year);
	var firstDateOfMonth = new Date();
	firstDateOfMonth.setFullYear(year, month, 1);

	var lastDateOfMonth = new Date();
	lastDateOfMonth.setFullYear(year, month, 1);
	lastDateOfMonth.setMonth(lastDateOfMonth.getMonth()+1);
	lastDateOfMonth.setDate(0);
	
	//set the first date of the week for 1st date
	firstDateOfMonth.setDate(firstDateOfMonth.getDate()-firstDateOfMonth.getDay());


	var lastDateOfWeekReached = false;
	var lastDateReached = false;
	do {
		var div = createElement("div");
		
		div.innerHTML = firstDateOfMonth.getDate();
		if (equals(firstDateOfMonth, curDate)) {
			div.className = "dateDiv current";
			div.addEventListener("click", selectDate, false);
		} else if (firstDateOfMonth.getMonth() != month) {
			div.className = "dateDiv inactive";
		} else {
			div.className = "dateDiv";
			div.addEventListener("click", selectDate, false);
		}
		dateDiv.push(div);
		if (equals(lastDateOfMonth, firstDateOfMonth)) {
			lastDateReached = true;
		}
		if (lastDateReached && firstDateOfMonth.getDay() == 6) {
			lastDateOfWeekReached = true;
		}
		firstDateOfMonth.setDate(firstDateOfMonth.getDate()+1);
	} while (!lastDateOfWeekReached);
	
	return dateDiv;
}

function equals(dateObject1, dateObject2) {
	return dateObject1.getDate() == dateObject2.getDate() && dateObject1.getMonth() == dateObject2.getMonth() && dateObject1.getFullYear() == dateObject2.getFullYear();
}

function populateMonthDropDown() {
	var select = createElement("select");
	select.name = "month";
	select.className = "monthName";
	select.addEventListener("change", reload, false);
	for (var int = 0; int < monthArray.length; int++) {
		var option = createElement("option");
		option.innerHTML = monthArray[int];
		option.value = monthArray[int];
		select.appendChild(option);
	}
	return select;
}

function populateYearDropDown() {
	var select = createElement("select");
	select.name = "year";
	select.className = "yearName";
	select.addEventListener("change", reload, false);
	for (var int = curDate.getFullYear(); int > 2000; int--) {
		var option = createElement("option");
		option.innerHTML = int;
		option.value = int;
		select.appendChild(option);
	}
	return select;
}

function populateCalendarDays() {
	var dayDivArray = [];
	for (var int = 0; int < dayArray.length; int++) {
		var div = createElement("div");
		div.className = "dateDiv day";
		div.innerHTML = dayArray[int];
		dayDivArray.push(div);
	}
	return dayDivArray;
}

function createCalendar() {
	var closeDiv = createElement("div");
	closeDiv.className = "close";
	closeDiv.innerHTML = "x";
	closeDiv.addEventListener("click", hideCalendar, false);
	
	var div = createElement("div");
	div.appendChild(closeDiv);
	var monthSelect = populateMonthDropDown();
	var yearSelect = populateYearDropDown();
	
	var monthDiv = createElement("div");
	monthDiv.className = "monthDiv";
	monthDiv.appendChild(div);
	monthDiv.appendChild(monthSelect);
	monthDiv.appendChild(yearSelect);
	
	var monthYearDiv = createElement("div");
	monthYearDiv.id = "monthYearDiv";
	monthYearDiv.appendChild(monthDiv);
	
	var dayDateDiv = createElement("div");
	dayDateDiv.id = "dayDateDiv";
	
	var days = populateCalendarDays();
	for (var int = 0; int < days.length; int++) {
		dayDateDiv.appendChild(days[int]);
	}
	
	var dates = populateCalendarDates(curDate.getMonth(), curDate.getFullYear());
	for (var int2 = 0; int2 < dates.length; int2++) {
		dayDateDiv.appendChild(dates[int2]);
	}
	
	var calBox = createElement("div");
	calBox.id = "calendarBox";
	calBox.appendChild(monthYearDiv);
	calBox.appendChild(dayDateDiv);
	return calBox;
}

function createElement(elementType) {
	return document.createElement(elementType);
}

function showCalendar() {
	var calendar = document.getElementById("calendar");
	if (calendar.childElementCount == 0) {
		calendar.appendChild(createCalendar());
		document.getElementsByName("month")[0].value = monthArray[curDate.getMonth()];
		document.getElementsByName("year")[0].value = curDate.getFullYear();
	}
	calendar.style.display = 'block';
}

function hideCalendar() {
	document.getElementById("calendar").style.display = 'none';
}

function selectDate(evt){
	if (lastSelected != undefined) {
		lastSelected.className = lastSelected.className.replace(" selected","");
	}
	lastSelected = evt.currentTarget;
	lastSelected.className += " selected";
	var monthSelected = monthArray.indexOf(document.getElementsByName("month")[0].value) + 1;
	var yearSelected = document.getElementsByName("year")[0].value;
	document.getElementById("date").value = lastSelected.innerHTML+"/"+monthSelected+"/"+yearSelected;
	hideCalendar();
}

function reload(evt) {
	var dayDateDiv = document.getElementById("dayDateDiv");
	dayDateDiv.innerHTML = "";
	
	var days = populateCalendarDays();
	for (var int = 0; int < days.length; int++) {
		dayDateDiv.appendChild(days[int]);
	}
	
	var dates = populateCalendarDates(monthArray.indexOf(document.getElementsByName("month")[0].value), document.getElementsByName("year")[0].value);
	for (var int2 = 0; int2 < dates.length; int2++) {
		dayDateDiv.appendChild(dates[int2]);
	}
}
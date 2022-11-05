/* ----------------------- Задание 1 --------------------------- */
function time() {
    var months=new Array(13);
    months[1]="января";months[2]="февраля"; months[3]="марта";
    months[4]="апреля";months[5]="мая"; months[6]="июня";
    months[7]="июля"; months[8]="августа"; months[9]="сентября";
    months[10]="октября"; months[11]="ноября"; months[12]="декабря";
    
    var time=new Date();
    var thismonth=months[time.getMonth()+1];
    var date=time.getDate();
    var thisyear=time.getYear();
    var day=time.getDay();
    
    if (thisyear < 2000)
    thisyear = thisyear + 1900;
    if(day==1) DayofWeek = "Понедельник";
    if(day==2) DayofWeek = "Вторник";
    if(day==3) DayofWeek = "Среда";
    if(day==4) DayofWeek = "Четверг";
    if(day==5) DayofWeek = "Пятница";
    if(day==6) DayofWeek = "Суббота";
    if(day==7) DayofWeek = "Воскресенье";
    document.write(DayofWeek + " " + thisyear + " " + date + " " + thismonth);
}
setInterval(function clock() {
    var now = new Date();
    var clock = document.getElementById("clock");
    clock.innerHTML = now.toLocaleTimeString();
}, 1000);


/* ----------------------- Задание 2 --------------------------- */
function calendar() {
    // Названия месяцев
    calendar.monthName=[
        'Январь', 'Февраль', 'Март', 'Апрель',
        'Май', 'Июнь', 'Июль', 'Август',
        'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
        ];
    // Названия дней недели
    calendar.dayName=[
        'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'
        ];
    // Выбранная дата
    calendar.selectedDate = {
        'Day' : null,
        'Month' : null,
        'Year' : null
        };
    // ID элемента для размещения календарика
    calendar.element_id=null;
    // Выбор даты
    calendar.selectDate = function(day,month,year) {
        calendar.selectedDate={
            'Day' : day,
            'Month' : month,
            'Year' : year
            };
        calendar.drawCalendar(month,year);
    }
    // Отрисовка календарика на выбранный месяц и год
    calendar.drawCalendar = function(month,year) {
        var tmp='';
        tmp+='<table class="calendar" cellspacing="0" cellpadding="0">';

        // Месяц и навигация
        tmp+='<tr>';
        tmp+='<td class="navigation" '+
        'onclick="calendar.drawCalendar('+(month>1?(month-1):12)+
        ','+(month>1?year:(year-1))+');">&#9668;<\/td>';
        tmp+='<td colspan="5" class="navigation" '+
        'onclick="calendar.drawCalendar('+
        calendar.selectedDate.Month+','+
        calendar.selectedDate.Year+');">'+
        calendar.monthName[(month-1)]+' - '+year+'<\/td>';
        tmp+='<td class="navigation" '+
        'onclick="calendar.drawCalendar('+(month<12?(month+1):1)+
        ','+(month<12?year:(year+1))+');">&#9658;<\/td>';
        tmp+='<\/tr>';

        // Шапка таблицы с днями недели
        tmp+='<tr>';
        tmp+='<th>'+calendar.dayName[0]+'<\/th>';
        tmp+='<th>'+calendar.dayName[1]+'<\/th>';
        tmp+='<th>'+calendar.dayName[2]+'<\/th>';
        tmp+='<th>'+calendar.dayName[3]+'<\/th>';
        tmp+='<th>'+calendar.dayName[4]+'<\/th>';
        tmp+='<th class="holiday">'+calendar.dayName[5]+'<\/th>';
        tmp+='<th class="holiday">'+calendar.dayName[6]+'<\/th>';
        tmp+='<\/tr>';

        // Количество дней в месяце
        var total_days = 32 - new Date(year, (month-1), 32).getDate();
        // Начальный день месяца
        var start_day = new Date(year, (month-1), 1).getDay();
        if (start_day==0) { start_day=7; }
        start_day--;
        // Количество ячеек в таблице
        var final_index=Math.ceil((total_days+start_day)/7)*7;

        var day=1;
        var index=0;
        do {
            // Начало строки таблицы
            if (index%7==0) {
                tmp+='<tr>';
                }
            
            // Пустые ячейки до начала месяца или после окончания
            if ((index<start_day) || (index>=(total_days+start_day))) {
            tmp+='<td class="grayed"> <\/td>';
            }
            else {
                var class_name='';
                // Выбранный день
                if (calendar.selectedDate.Day==day &&
                    calendar.selectedDate.Month==month &&
                    calendar.selectedDate.Year==year) {
                    class_name='selected';
                }

                // Праздничный день
                else if (index%7==6 || index%7==5) {
                        class_name='holiday';
                }
                // Ячейка с датой
                tmp+='<td class="'+class_name+'" '+
                    'onclick="calendar.selectDate('+
                    day+','+month+','+year+');">'+day+'<\/td>';
                day++;
            }
            // Конец строки таблицы
            if (index%7==6) {
                tmp+='<\/tr>';
                }
            
        index++;
        }

    while (index<final_index);

    tmp+='<\/table>';

    // Вставить таблицу календарика на страницу
    var el=document.getElementById(calendar.element_id);
    if (el) {
        el.innerHTML=tmp;
    }
}

// ID элемента для размещения календарика
calendar.element_id = 'calendar_table';

// По умолчанию используется текущая дата
calendar.selectedDate={
    'Day' : new Date().getDate(),
    'Month' : parseInt(new Date().getMonth())+1,
    'Year' : new Date().getFullYear()
};

// Нарисовать календарик
calendar.drawCalendar(
    calendar.selectedDate.Month,
    calendar.selectedDate.Year
);
}


/* ----------------------- Задание 3 --------------------------- */
/* подсчитывание элементов в форме */
function myFunc() {
    var count = document.querySelectorAll(".formaa").length;
    var num = document.querySelectorAll(".forma-num").length;
    var name = document.getElementsByName("Sel1").length;
    var fio = document.getElementsByTagName("table").length;
    var tr = document.getElementsByTagName("tr").length;
    var td = document.getElementsByTagName("td").length;
    var checkbox = document.getElementsByName("ch").length;
    var option = document.getElementsByTagName("option").length;
    sum = count + num + name + fio + tr + td + checkbox + option;
    document.write(sum); 
}


/* ----------------------- Задание 4 --------------------------- */
function color(){
    window.onload = function() {
        var lol = Math.floor(Math.random() * 3) + 1;
        var first=document.getElementById('first');
        var second=document.getElementById('second');
        var third=document.getElementById('third');

        switch (lol)
            {
            case 1: first.style.display = 'block';break;
            case 2: second.style.display = 'block';break;
            case 3: third.style.display = 'block';break;
            default: first.style.display = 'block';break;
            }
        }
}
function color_rand(){
    setInterval(function() {
        document.getElementById("ddd").style.backgroundColor = '#'+((1<<24)*Math.random()|0).toString(16)
        }, 150)
}


/* ----------------------- Задание 5 --------------------------- */
function Add(){
        const data = document.getElementById("list");
        let task;
        while (task = prompt("Введите пункт списка:"))
        data.insertAdjacentHTML("beforeend", `<li>${task}</li>`);
}


/* ----------------------- Задание 6 --------------------------- */



/* ----------------------- Задание 7 --------------------------- */
function end() {
    document.getElementById("menu").innerText = "Сладости закончились"
    }
    
    function hide(end) {
    let a = 0
    document.getElementById("menu_ul").onclick = function(event) {
    a++
    event.target.style.opacity = "0";
    event.target.style.transition = "opacity, 0.5s";
    if (a==5)
    end()
    }
    }


/* ----------------------- Задание 8 --------------------------- */
function ex8(){
    const img=document.querySelector("#logo");
    const text=document.querySelector("#textlogo");
    logo.addEventListener('mouseover',function(){
    img.style.opacity = '0';})
    logo.addEventListener('mouseout',function(){
    img.style.opacity = '1';})
}



/* ----------------------- Задание 9 + 10  --------------------------- */
/* вывод всех полей на экран */
function Complete(){
    let checkEmail = function(userEmail){
        const rexEmail = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
        return rexEmail.test(userEmail);
    }

    var Elem="\nИмя: " + document.Sel1.Name.value +
        "\nПароль: " + document.Sel1.Password_One.value +
        "\nEmail: " + document.Sel1.Email.value +
        "\nТелефон: " + document.Sel1.Phone.value +
        "\nПол: " + document.Sel1.Code.value +
        "\nВаша специализация: " + document.Sel1.mySelect.value +
        "\nСтрана: " + document.Sel1.mySelect2.value;

    if (checkEmail(document.Sel1.Email.value) &&  (document.Sel1.Password_One.value==document.Sel1.Password_Two.value))
        alert(Elem);
    else
        alert("Ошибка при вводе \nПопробуйте еще раз");
}


function regPassword(){
    var Password_One = document.getElementById("Password_One").value;
        var pas_regV = /^[a-z0-9]{6,}$/gi;
        if (Password_One.match(pas_regV) == null){
            document.getElementById("divPassword").innerHTML = "Пожалуйста, введите пароль в формате: aaahhh";
            document.getElementById("Password_One").style.border="2px solid red";
        }
        else {
            document.getElementById("divPassword").innerHTML = "";
            document.getElementById("Password_One").style.border="2px solid green";
        }

    var Password_Two = document.getElementById("Password_Two").value;
        var pas_regV = /^[a-z0-9]{6,}$/gi;
        if (Password_Two.match(pas_regV) == null){
            document.getElementById("divPassword_Two").innerHTML = "Пожалуйста, введите совпадающие пароли!";
            document.getElementById("Password_Two").style.border="2px solid red";
        }
        else {
            document.getElementById("divPassword_Two").innerHTML = "";
            document.getElementById("Password_Two").style.border="2px solid green";
        }
}

function regPhone(){
    var Phone = document.getElementById("Phone").value;
    var phone_regV = /^\d[\d\(\)\ -]{4,9}\d$/;
    if (Phone.match(phone_regV) == null){
        divPhone.innerHTML = 'Пожалуйста, введите правильный номер телефона!'
        document.getElementById("Phone").style.border="2px solid red";
    }
    else {
        document.getElementById("divPhone").innerHTML = "";
        document.getElementById("Phone").style.border="2px solid green";
    }
}

function regName(){
    var Name = document.getElementById("Name").value;
    var name_regV = /[а-яА-я]+$/gi;
    if (Name.match(name_regV) == null){
        divName.innerHTML = "Пожалуйста, введите имя в формате: Иван!"
        document.getElementById("Name").style.border="2px solid red";
    }
    else {
        document.getElementById("divName").innerHTML = "";
        document.getElementById("Name").style.border="2px solid green";
    }
}

function regFacultet(){
    var facultet = document.getElementById("facultet").value;
    var facultet_regV = /[а-яА-я]+$/gi;
    if (facultet.match(facultet_regV) == null){
        divFacultet.innerHTML = "Пожалуйста, введите корректное название факультета!"
        document.getElementById("facultet").style.border="2px solid red";
    }
    else {
        document.getElementById("divFacultet").innerHTML = "";
        document.getElementById("facultet").style.border="2px solid green";
    }
}

function regCafedra(){
    var cafedra = document.getElementById("cafedra").value;
    var cafedra_regV = /[а-яА-я]+$/gi;
    if (cafedra.match(cafedra_regV) == null){
        divCafedra.innerHTML = "Пожалуйста, введите корректное название кафедры!"
        document.getElementById("cafedra").style.border="2px solid red";
    }
    else {
        document.getElementById("divCafedra").innerHTML = "";
        document.getElementById("cafedra").style.border="2px solid green";
    }
}

function regEmail(){
    var Email = document.getElementById("Email").value;
    var Email_regV = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
    if (Email.match(Email_regV) == null){
        divEmail.innerHTML = "Пожалуйста, введите корректый email!"
        document.getElementById("Email").style.border="2px solid red";
    }
    else {
        document.getElementById("divEmail").innerHTML = "";
        document.getElementById("Email").style.border="2px solid green";
    }
}


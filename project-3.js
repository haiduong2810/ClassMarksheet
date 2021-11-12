const form = $('form');
form.on('submit', event => {
    // Ngăn chặn sự kiện mặc định của submit
    event.preventDefault()
    inputScores();
})

let mediumScores = $("#mediumScores");
let hsg = $("#hsg");
let sortStudent = $("#sortStudent");

// Hàm cho người dùng nhập học sinh và in ra bảng
function inputScores() {
    var testScore = {
        name: "",
        math: 0,
        physical: 0,
        chemistry: 0
    };


    testScore.name = $("#name").val();
    testScore.math = Number(Number($("#math").val()).toFixed(2));
    testScore.physical = Number(Number($("#physical").val()).toFixed(2));
    testScore.chemistry = Number(Number($("#chemistry").val()).toFixed(2));

    var table = $("#myTable > tbody");
    var row = $("<tr>");
    table.append(row);
    row.append($("<td>").text($("#myTable > tbody").children("tr").length));
    row.append($("<td>").text(testScore.name));
    row.append($("<td>").text(testScore.math));
    row.append($("<td>").text(testScore.physical));
    row.append($("<td>").text(testScore.chemistry));
    row.append($("<td>").text("?"));


    $("form").trigger("reset");

    $("#note").hide(250);

}

// Hàm tính điểm trung bình
function mediumS() {
    var rows = $("#myTable > tbody").children("tr");
    rows.each(function() {
        var cellMS = $(this).children("td").eq(5);
        if (cellMS.text() == "?") {
            var math = Number($(this).children("td").eq(2).text());
            var physical = Number($(this).children("td").eq(3).text());
            var chemistry = Number($(this).children("td").eq(4).text());
            var medium = Number(((math + physical + chemistry) / 3).toFixed(2));
            $(this).children("td").eq(5).text(medium);
        }
    });

    $("#note").hide(250);
}

// Hàm xác định học sinh giỏi
function goodStudent() {
    var rows = $("#myTable > tbody").children("tr");
    rows.each(function() {
        // Học sinh có số điemr trên 8 sẽ in đỏ
        if (parseFloat($(this).children("td").eq(5).text()) >= 8) {
            $(this).css("color", "red");
        }
    });

    $("#note").hide(250);
}

// Hàm sắp xếp học sinh theo điểm trung bình
function sort(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = $("#myTable > tbody");
    switching = true;
    dir = "asc";

    while (switching) {

        var rows = $("#myTable > tbody").children("tr");
        switching = false;

        for (i = 0; i < (rows.length - 1); i++) {

            shouldSwitch = false;


            x = parseFloat(rows.eq(i).children("td").eq(n).text());
            y = parseFloat(rows.eq(i + 1).children("td").eq(n).text());

            if (dir == "asc") {
                if (x > y) {
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                if (x < y) {
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            rows.eq(i + 1).insertBefore(rows.eq(i));
            switching = true;

            switchcount++;
        } else {
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }

    $("#note").show(250);

}


mediumScores.on("click", mediumS);
hsg.on("click", goodStudent);
sortStudent.on("click", function() {
    sort(5);
});
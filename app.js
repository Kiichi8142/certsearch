let table = new DataTable("#data-table", {
    language: {
        "sProcessing":   "กำลังดำเนินการ...",
        "sLengthMenu":   "แสดง _MENU_ แถว",
        "sZeroRecords":  "ไม่พบข้อมูล",
        "sInfo":         "แสดง _START_ ถึง _END_ จาก _TOTAL_ แถว",
        "sInfoEmpty":    "แสดง 0 ถึง 0 จาก 0 แถว",
        "sInfoFiltered": "(กรองข้อมูล _MAX_ ทุกแถว)",
        "sInfoPostFix":  "",
        "sSearch":       "ค้นหา:",
        "sUrl":          "",
    },
    columnDefs: [
        { "width": "6%", "targets": 0},
        { "width": "15%", "targets": 1},
        { "width": "38%", "targets": 2},
        { "width": "6%", "targets": 3},
        { "width": "6%", "targets": 4},
        { "width": "6%", "targets": 5},
    ]
});

fetch("data.csv")
    .then((response) => response.text())
    .then((data) => {
        const parsedData = Papa.parse(data, { header: true });
        parsedData.data.forEach((row) => {
            table.row
                .add([
                    row["เลขที่เกียรติบัตร"],
                    row["ชื่อ - สกุล"],
                    row["หลักสูตร"],
                    row["วันเริ่มอบรม"],
                    row["วันสิ้นสุดอบรม"],
                    `<a href="${row["รูปเกียรติบัตร"]}" target="_blank" class="text-blue-500 underline">ดาวโหลดเกียรติบัตร</a>`,
                ])
                .draw();
        });
    })
    .catch((error) => {
        console.error("Error fetching the CSV file:", error);
    });

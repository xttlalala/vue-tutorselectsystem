import xlsx from "xlsx";

export function readStudentsFile(file) {
  return new Promise(resolve => {
    let students = [];
    let reader = new FileReader();
    reader.readAsBinaryString(file);
    // 异步
    reader.onload = event => {
      let data = event.target.result;
      let workbook = xlsx.read(data, { type: "binary" });
      let sheet = workbook.Sheets[workbook.SheetNames[0]];
      xlsx.utils.sheet_to_row_object_array(sheet).forEach(r => {
        let number = parseInt(r.__EMPTY);
        if (!isNaN(number)) {
          let st = new Student();
          st.number = number;
          st.name = r.__EMPTY_1;
          st.score = r.__EMPTY_9;
          students.push(st);
        }
      });
    };
    // 当load结束，回调
    // 当执行resolve()方法，会激活调用处的then()方法
    reader.onloadend = () => {
      resolve(students);
    };
  });
}

class Student {
  number;
  name;
  score;
}

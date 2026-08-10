const submit = document.getElementById("submit");
const userName = document.getElementById("Name");
const userCode = document.getElementById("Password");
const loadscreen = document.getElementById("load-screen");

const prediction_center_url = "https://script.google.com/macros/s/AKfycbzlJHXy3YRs92_CTJ6YOdkUiCB-pe38N-RKRBdYsGHmH1E5AEYsTSIz4wb3dGBr7q3RDw/exec";

submit.addEventListener("click", function(){
  const Name = userName.value.trim();
  const Code = userCode.value.trim().toUpperCase();

  if (Name === "" || Code === ""){
    loadscreen.innerHTML = "Please enter your Name and Password";
    return;
  }

  loadscreen.innerHTML = "Entering your world...";
  console.log("Data:", Name, Code);
  
  const final_url = `${prediction_center_url}?name=${encodeURIComponent(Name)}&code=${encodeURIComponent(Code)}`;

  // ยิง fetch แบบเรียบง่ายที่สุดเพื่อรองรับ Google Redirect
  fetch(final_url)
    .then(response => response.json())
    .then(data => {
      console.log("result is", data);

      if(data.status === "not_found") {
        loadscreen.innerHTML = "Error! Please try again or DM Admin";
      } else {

        let packageName = "Special Package Edition";

        if (Code.startsWith ("PAT")) {
          packageName = "Pick A Character";
        } else if (Code.startsWith("MAT")) {
          packageName = "My Attitude";
        } else if (Code.startsWith("ATW")) {
          packageName = "Around the World";
        } else if (Code.startsWith("BRT")) {
          packageName = "Bestie Relationship";
        }
        
      document.getElementById("userName-res").innerText = `Name : K' ${Name} `;
      document.getElementById("Packs-res").innerText=`Package : ${packageName}`;
      document.getElementById("Prediction-res").innerText = data.predictionText;

// 💡 เช็กและดึง URL ของรูปภาพ
        let imgUrl = "";

        if (data && data.cardImage) {
          if (typeof data.cardImage === "object") {
            imgUrl = data.cardImage.url || data.cardImage.src || data.cardImage.link || "";
          } else {
            imgUrl = data.cardImage; // รับค่า URL สดๆ จาก Google Sheets
          }
        }

        // นำ URL ไปใส่ในแท็ก <img>
       const cardImgElement = document.getElementById("Cardimg_res");
        if (cardImgElement && imgUrl) {
          cardImgElement.src = imgUrl;
        }
        const loginpart = document.getElementById("Login");
        if (loginpart) loginpart.style.display = "none";

        loadscreen.innerHTML = "";

        const predictionpart = document.getElementById("Prediction");
        if (predictionpart) predictionpart.style.display = "flex";
      } 
    }) 
    .catch(error => {
      console.error("error by", error);
      loadscreen.innerHTML = "Sorry, Please dm Admin at Line";
    });
});
function goBack() {
  document.getElementById("Prediction").style.display = "none";

  const loginpart = document.getElementById("Login");
  if (loginpart) loginpart.style.display = "flex";
}
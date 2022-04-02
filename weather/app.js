const cityForm =  document.querySelector("form");
const card = document.querySelector(".box");
const details = document.querySelector(".innerbox");
const display = document.querySelector(".display");
const iconImg = document.querySelector(".iconImg");

// updating ui

const updateUI = (data) =>{
    const {cityDets , waether} = data;
    // console.log(cityDets); 
    // console.log(waether); 
    
    // updating ui
    details.innerHTML =`
    <h4>${cityDets.EnglishName}</h4>
    <h5>${waether.WeatherText}</h5>
    <p>
      <span>${waether.Temperature.Metric.Value}</span>
      <span>&deg;C</span>
    </p>
    `;
    if (card.classList.contains("not-active")) {
        card.classList.remove("not-active")
    }
    // for icons
    const iconSrc = `../image/icons/${waether.WeatherIcon}.svg`;
    iconImg.setAttribute("src",iconSrc);

    // updating the time or day stuff
    const displaySrc = waether.IsDayTime?"../image/day.svg":"../image/night.svg";
    display.src= displaySrc;
   
}

// updating city
const updateCity = async (city) => {
//   console.log(city);
  const cityDets = await getCity(city);
  const waether = await getWeather(cityDets.Key);
  return{cityDets,waether};
}

cityForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    // get city value
    const city = cityForm.search.value.trim();
    cityForm.reset();

    // update the ui with new city
    updateCity(city).then(data=>{
        updateUI(data);
    }).catch(err=>{
        alert("location invalid")
    })
})
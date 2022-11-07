document.body.style.backgroundColor = '#547154';

// Outermost Div

const main_div = document.createElement('div');
main_div.style.height = '100vh';
main_div.style.width = '100vw';
main_div.style.minWidth = '169px';
main_div.setAttribute('class', 'container-fluid');

const row_div = document.createElement('div');
row_div.style.height = '100%';
row_div.style.minWidth = '100%';
row_div.marginBotton = '10px';
row_div.setAttribute('class', 'row');
row_div.setAttribute('class', 'justify-content-center');
row_div.setAttribute('class', 'align-content-center');

const row1_innerdiv = document.createElement('div');
row1_innerdiv.setAttribute('class', 'row');
row1_innerdiv.style.minheight = '10%';
row1_innerdiv.style.width = '100%';
row1_innerdiv.setAttribute('class', 'justify-content-center');

const col1_row1 = document.createElement('div');

const row2_innerdiv = document.createElement('div');
// row4_innerdiv.setAttribute('class', 'col-12');
row2_innerdiv.setAttribute('class', 'row');
row2_innerdiv.style.minheight = '10%';
row2_innerdiv.style.width = '100%';
row2_innerdiv.style.border = '2px solid yellow';

row2_innerdiv.classList.add("justify-content-center");
row2_innerdiv.classList.add("align-items-center");

row2_innerdiv.innerHTML = "<h2 style = 'color: white; padding: 5px'>Predict the nationality of a name</h2>";


const row3_innerdiv = document.createElement('div');
row3_innerdiv.setAttribute('class', 'row');
row3_innerdiv.style.minheight = '20%';
row3_innerdiv.style.width = '100%';
row3_innerdiv.style.border = '2px solid yellow';
row3_innerdiv.classList.add("justify-content-center");
row3_innerdiv.classList.add("align-items-center");

row3_innerdiv.innerHTML = "<text style = 'color: white; padding: 5px'>This Web App predicts the nationality of a person given their name. To do so, type the name which you want to search for on the below input box & Click search button/Press Enter key.";

const row4_innerdiv = document.createElement('div');
row4_innerdiv.setAttribute('class', 'row');
row4_innerdiv.style.minHeight = '20%';
row4_innerdiv.style.width = '100%';
row4_innerdiv.classList.add("justify-content-center");
row4_innerdiv.classList.add("align-items-center");

const col1_row2 = document.createElement('div');
col1_row2.setAttribute('class', 'col-12');

// Heading Element

const H1Tag = document.createElement('h1');
H1Tag.innerText = 'Name Based Nationality Finder';
H1Tag.style.margin = '10px 0';
H1Tag.style.textAlign = 'center';
H1Tag.style.color = 'white'

// Search Element
const searchNameTag = document.createElement('input');
searchNameTag.type = 'text';
searchNameTag.required;
searchNameTag.style.width = '80%';
searchNameTag.style.border = '2px solid black'
searchNameTag.style.marginTop = '10px';

searchNameTag.placeholder = 'Please enter the name to find the nationality';
searchNameTag.title = 'Please enter the name to find the nationality';

// Button Element

const submitButton = document.createElement('button');
submitButton.innerText = 'Search';
submitButton.style.margin = '10px 0 0 10px';

// Spinner Element

const spinnerEle = document.createElement('i');
spinnerEle.setAttribute('class', 'fa-solid fa-circle-notch fa-spin fa-2x');
spinnerEle.style.marginLeft = '5px';
spinnerEle.style.color = 'red';
spinnerEle.style.display = 'none';


// Result Element

const resDivTag1 = document.createElement('div') ;
resDivTag1.setAttribute('class', 'row');
resDivTag1.style.textAlign = 'center';
resDivTag1.style.margin = '20px 0';
resDivTag1.style.display = 'none';

document.body.append(main_div);
main_div.appendChild(row_div);
row_div.append(row1_innerdiv, row2_innerdiv, row3_innerdiv, row4_innerdiv);
row1_innerdiv.append(col1_row1);
col1_row1.append(H1Tag);

row4_innerdiv.append(col1_row2);
col1_row2.append(searchNameTag, submitButton, spinnerEle, resDivTag1);

// async/await Function to find name based on its nationality

const nameBasedNationalityFinder = async (name) => {
   try {
     
    searchNameTag.value = name;
    searchNameTag.setSelectionRange(0, name.length);
    searchNameTag.focus();

    // Nataniolize API
     const response_1 = await fetch(`https://api.nationalize.io?name=${name}`);
     const nationality = await response_1.json();

     console.log(nationality);

     // RestCountries API
     const response_2 = await fetch('https://restcountries.com/v3.1/all');
     const restcountries = await response_2.json();
     
     resDivTag1.innerText = "";

     let country_name, flag;
      
     if(nationality.country.length !== 0) {
        resDivTag1.setAttribute('class', 'bg-primary row');
        resDivTag1.style.border = '5px dotted black';
        
        const nameTag = document.createElement('div');
        nameTag.innerHTML = `Showing search results for name <b>${name.toUpperCase()}</b>`;
        nameTag.style.backgroundColor = 'yellow';

        resDivTag1.append(nameTag);

        nationality.country.slice(0, 2).forEach( (country) => {
            try {
                
              country_name = country.country_id;
                
              // To find the country name
              restcountries.forEach((restcountry) => {

                if(country.country_id === restcountry.cca2) {
                    country_name = restcountry.name.common;
                    flag = restcountry.flags.png;
                    console.log(`COUNTRY NAME : ${country_name}`);
                }
       
              });
              
              const imgTag = document.createElement('img');
              imgTag.src = flag;
              imgTag.height = 50;
              imgTag.width = 80;
              imgTag.alt = 'Image';
              
              const resDivTag2 = document.createElement('div') ;
              // resDivTag2.setAttribute('class', 'row');
              resDivTag2.style.display = 'flex';
              resDivTag2.style.flexWrap = 'wrap';
              
              resDivTag2.style.justifyContent='center';
              resDivTag2.style.alignItems = 'center';
              resDivTag2.setAttribute('class', 'text-white');
              resDivTag2.style.minHeight = '90px';
    
              resDivTag2.style.border = '5px solid ';
               
              const imgDivTag = document.createElement('div');
              imgDivTag.setAttribute('class', 'col-sm-2' );
              imgDivTag.style.minWidth = '80px';
              
              imgDivTag.append(imgTag);
              imgDivTag.style.margin = '10px 5px 0';

              resDivTag2.append(imgDivTag);
             
              resDivTag2.innerHTML += `<div class= 'row col-sm-10'><div class='col-sm-3' style='margin-top: 2px'>Country ID : ${country.country_id} </div>  <div class='col-sm-6'>Country Name : <b>${country_name}</b> </div> <div class='col-sm-3'> Probability : <b>${country.probability}</b></div></div>`;
              
              resDivTag1.append(resDivTag2);
              spinnerEle.style.display = 'none';
              resDivTag1.style.display = 'block';
              

            } catch(error) {
              console.log(error);
            }
        })
     } else {
        resDivTag1.setAttribute('class', 'bg-danger');
        resDivTag1.innerText = "Not Found";
     }

   } catch (error) {
       console.log(error);
   }
   submitButton.removeEventListener('click', resultClickFunc);
   searchNameTag.removeEventListener('keydown', resultEnterFunc);
}

// Click Listener Function
const resultClickFunc = () => {

  const name = searchNameTag.value;
  
  if(name.trim() !== ''){
    resDivTag1.style.display = 'none';
    spinnerEle.style.display = 'inline-block';
   nameBasedNationalityFinder(name.trim());
  }
  else {
   alert("You didn't given any name! So Please enter some person name & try again");
  }
}

// Enter Listener Function
const resultEnterFunc = (e) => {

  if(e.key === 'Enter') {
        resultClickFunc();
  }
}

// Event Listeners
searchNameTag.addEventListener('input', () => {

    submitButton.addEventListener('click', resultClickFunc);

    searchNameTag.addEventListener('keydown', resultEnterFunc);

})
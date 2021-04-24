  //Function that makes spaces between numbers (Loaned form the internet, using this function for my own plesure not for points)
  function numberWithSpaces(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  //Functon that fetches global corona stats from "https://api.covid19api.com/summary" and outputs them nicely to the page
  function loadGlobal() {

    //Connecting and fetching data from the API
    var url = "https://api.covid19api.com/summary";
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.open("GET", url, true);
      xmlhttp.send();
  
      xmlhttp.onreadystatechange = function() {
          if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
              
            //placing the data to jsonObj
            jsonObj = JSON.parse(xmlhttp.responseText);
            
            //Putting the data to console for inscpection
            console.log(jsonObj.Global);

            //Making variables of all the data that will be shown on the page
            var newCases = jsonObj.Global.NewConfirmed;
            var newDeaths = jsonObj.Global.NewDeaths;
            var newRecovered = jsonObj.Global.NewRecovered; 
            var totalCases = jsonObj.Global.TotalConfirmed;
            var totalDeaths = jsonObj.Global.TotalDeaths;
            var totalRecovered = jsonObj.Global.TotalRecovered;

            //Using the numberWithSpaces(x) function to make spaces between numbers shown on the page
            var newCasesSpaces = numberWithSpaces(newCases);
            var newDeathsSpaces = numberWithSpaces(newDeaths);
            var newRecoveredSpaces = numberWithSpaces(newRecovered);
            var totalCasesSpaces = numberWithSpaces(totalCases);
            var totalDeathsSpaces = numberWithSpaces(totalDeaths);
            var totalRecoveredSpaces = numberWithSpaces(totalRecovered);

            //Making variable out of the date
            var date = jsonObj.Global.Date;

            //Leaving unwanted charcters out of the date and only showing the year/month/date
            var dateClean = "";

            for (i = 0; i < 10; i++) {
              dateClean += date[i];
            }

            //Creating the table shown on the page that will be placed to the <div> element I'm using bootstrap cards and ionic icons to make the table and the data pretty.
            //Data is placed on the table using the variables created above.
            var table = '<div class="card" style="background-color: white;"><div class="card-body"><h2 class="card-title">Global Situation ' + dateClean + '</h2><table>';
            table += '<tr>';
            table += '<td><div class="card text-center" style="background-color: rgb(255, 218, 214);"><div class="card-body"><h5 class="card-title">New cases</h5><ion-icon name="bag-add"></ion-icon><br><strong>' + newCasesSpaces + '</strong></div></div></td>';
            table += '<td><div class="card text-center" style="background-color: rgb(207, 207, 207);"><div class="card-body"><h5 class="card-title">New deaths</h5><ion-icon name="skull"></ion-icon><br><strong>' + newDeathsSpaces + '</strong></div></div></td>';
            table += '<td><div class="card text-center" style="background-color: rgb(219, 255, 239);"><div class="card-body"><h5 class="card-title">New recoveries</h5><ion-icon name="happy"></ion-icon><br><strong>' + newRecoveredSpaces + '</strong></div></div></td>';
            table += '</tr>';
            table += '<tr>';
            table += '<td><div class="card text-center" style="background-color: rgb(255, 218, 214);"><div class="card-body"><h5 class="card-title">Total cases</h5><ion-icon name="bag-add"></ion-icon><br><strong>' + totalCasesSpaces + '</strong></div></div></td>';
            table += '<td><div class="card text-center" style="background-color: rgb(207, 207, 207);"><div class="card-body"><h5 class="card-title">Total deaths</h5><ion-icon name="skull"></ion-icon><br><strong>' + totalDeathsSpaces + '</strong></div></div></td>';
            table += '<td><div class="card text-center" style="background-color: rgb(219, 255, 239);"><div class="card-body"><h5 class="card-title">Total recoveries</h5><ion-icon name="happy"></ion-icon><br><strong>' + totalRecoveredSpaces + '</strong></div></div></td>';
            table += '</tr>'
            table += '</table></div></div>';
            
            //In the end we when the table is done it is written to the <div> element with the "readyTable" ID
            document.getElementById("readyTable").innerHTML = table;
          }
      }
  }

  //Next function creates functionality to the dropdown selection, so that when a country
  //is selected new query will be made and the data will be placed nicely on the table
  function chooceCountry(){
    
    //Placing users selection to variable
    var country = document.getElementById('selectCountry').value;

    //First selection will just load the loadGlobal() function from above
    if (country == "Global situation") {
        loadGlobal();
    }
    
    //Next selection will chooce and display data from Finland
    else if (country == "Finland") {
        //Start is exactly the same as above
        var url = "https://api.covid19api.com/summary";
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                
              jsonObj = JSON.parse(xmlhttp.responseText);
              
              //This time we log to the console Finland's specific data for inspection
              console.log(jsonObj.Countries[58]);

              //Taking the country's from the data to variable
              var countryName = jsonObj.Countries[58].Country;

              //Taking all the data that will be on the table and placing them to variables
              var newCases = jsonObj.Countries[58].NewConfirmed;
              var newDeaths = jsonObj.Countries[58].NewDeaths;
              var newRecovered = jsonObj.Countries[58].NewRecovered;
              var totalCases = jsonObj.Countries[58].TotalConfirmed;
              var totalDeaths = jsonObj.Countries[58].TotalDeaths;
              var totalRecovered = jsonObj.Countries[58].TotalRecovered;
              
              //Again using the function that makes nice spaces between numbers
              var newCasesSpaces = numberWithSpaces(newCases);
              var newDeathsSpaces = numberWithSpaces(newDeaths);
              var newRecoveredSpaces = numberWithSpaces(newRecovered);
              var totalCasesSpaces = numberWithSpaces(totalCases);
              var totalDeathsSpaces = numberWithSpaces(totalDeaths);
              var totalRecoveredSpaces = numberWithSpaces(totalRecovered);

              //Again taking the date to variable and cleaning it for presentation
              var date = jsonObj.Countries[58].Date;
              var dateClean = "";

              for (i = 0; i < 10; i++) {
              dateClean += date[i];
              }
              
              //Very similiar to above. Making the Table and placing it to the innerHTML of the wanted <div> element
              var table = '<div class="card" style="background-color: white;"><div class="card-body"><h2 class="card-title"> ' + countryName + ' ' + dateClean + '</h2><table>';
              table += '<tr>';
              table += '<td><div class="card text-center" style="background-color: rgb(255, 218, 214);"><div class="card-body"><h5 class="card-title">New cases</h5><ion-icon name="bag-add"></ion-icon><br><strong>' + newCasesSpaces + '</strong></div></div></td>';
              table += '<td><div class="card text-center" style="background-color: rgb(207, 207, 207);"><div class="card-body"><h5 class="card-title">New deaths</h5><ion-icon name="skull"></ion-icon><br><strong>' + newDeathsSpaces + '</strong></div></div></td>';
              table += '<td><div class="card text-center" style="background-color: rgb(219, 255, 239);"><div class="card-body"><h5 class="card-title">New recoveries</h5><ion-icon name="happy"></ion-icon><br><strong>' + newRecoveredSpaces + '</strong></div></div></td>';
              table += '</tr>';
              table += '<tr>';
              table += '<td><div class="card text-center" style="background-color: rgb(255, 218, 214);"><div class="card-body"><h5 class="card-title">Total cases</h5><ion-icon name="bag-add"></ion-icon><br><strong>' + totalCasesSpaces + '</strong></div></div></td>';
              table += '<td><div class="card text-center" style="background-color: rgb(207, 207, 207);"><div class="card-body"><h5 class="card-title">Total deaths</h5><ion-icon name="skull"></ion-icon><br><strong>' + totalDeathsSpaces + '</strong></div></div></td>';
              table += '<td><div class="card text-center" style="background-color: rgb(219, 255, 239);"><div class="card-body"><h5 class="card-title">Total recoveries</h5><ion-icon name="happy"></ion-icon><br><strong>' + totalRecoveredSpaces + '</strong></div></div></td>';
              table += '</tr>'
              table += '</table></div></div>';
    
              document.getElementById("readyTable").innerHTML = table;
            }
        }
     }
    
     //Next I'm doing the exactly the same code for other countries in the dropd down selection. Only difference is the number in jsonObj.Countries[x]'
     // where the x is different for all the countries 
    else if (country =="Germany")  {
        var url = "https://api.covid19api.com/summary";
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                
              jsonObj = JSON.parse(xmlhttp.responseText);
    
              console.log(jsonObj.Countries[63]);

              var countryName = jsonObj.Countries[63].Country;

              var newCases = jsonObj.Countries[63].NewConfirmed;
              var newDeaths = jsonObj.Countries[63].NewDeaths;
              var newRecovered = jsonObj.Countries[63].NewRecovered;
              var totalCases = jsonObj.Countries[63].TotalConfirmed;
              var totalDeaths = jsonObj.Countries[63].TotalDeaths;
              var totalRecovered = jsonObj.Countries[63].TotalRecovered;

              var newCasesSpaces = numberWithSpaces(newCases);
              var newDeathsSpaces = numberWithSpaces(newDeaths);
              var newRecoveredSpaces = numberWithSpaces(newRecovered);
              var totalCasesSpaces = numberWithSpaces(totalCases);
              var totalDeathsSpaces = numberWithSpaces(totalDeaths);
              var totalRecoveredSpaces = numberWithSpaces(totalRecovered);

              var date = jsonObj.Countries[63].Date;
              var dateClean = "";

              for (i = 0; i < 10; i++) {
              dateClean += date[i];
              }
    
              var table = '<div class="card" style="background-color: white;"><div class="card-body"><h2 class="card-title"> ' + countryName + ' ' + dateClean + '</h2><table>';
              table += '<tr>';
              table += '<td><div class="card text-center" style="background-color: rgb(255, 218, 214);"><div class="card-body"><h5 class="card-title">New cases</h5><ion-icon name="bag-add"></ion-icon><br><strong>' + newCasesSpaces + '</strong></div></div></td>';
              table += '<td><div class="card text-center" style="background-color: rgb(207, 207, 207);"><div class="card-body"><h5 class="card-title">New deaths</h5><ion-icon name="skull"></ion-icon><br><strong>' + newDeathsSpaces + '</strong></div></div></td>';
              table += '<td><div class="card text-center" style="background-color: rgb(219, 255, 239);"><div class="card-body"><h5 class="card-title">New recoveries</h5><ion-icon name="happy"></ion-icon><br><strong>' + newRecoveredSpaces + '</strong></div></div></td>';
              table += '</tr>';
              table += '<tr>';
              table += '<td><div class="card text-center" style="background-color: rgb(255, 218, 214);"><div class="card-body"><h5 class="card-title">Total cases</h5><ion-icon name="bag-add"></ion-icon><br><strong>' + totalCasesSpaces + '</strong></div></div></td>';
              table += '<td><div class="card text-center" style="background-color: rgb(207, 207, 207);"><div class="card-body"><h5 class="card-title">Total deaths</h5><ion-icon name="skull"></ion-icon><br><strong>' + totalDeathsSpaces + '</strong></div></div></td>';
              table += '<td><div class="card text-center" style="background-color: rgb(219, 255, 239);"><div class="card-body"><h5 class="card-title">Total recoveries</h5><ion-icon name="happy"></ion-icon><br><strong>' + totalRecoveredSpaces + '</strong></div></div></td>';
              table += '</tr>'
              table += '</table></div></div>';
    
              document.getElementById("readyTable").innerHTML = table;
            }
        }
    }
    
    //Same for US only the number (181) changes
    else if (country =="United States")  {
        var url = "https://api.covid19api.com/summary";
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                
              jsonObj = JSON.parse(xmlhttp.responseText);
    
              console.log(jsonObj.Countries[181]);

              var countryName = jsonObj.Countries[181].Country;

              var newCases = jsonObj.Countries[181].NewConfirmed;
              var newDeaths = jsonObj.Countries[181].NewDeaths;
              var newRecovered = jsonObj.Countries[181].NewRecovered;
              var totalCases = jsonObj.Countries[181].TotalConfirmed;
              var totalDeaths = jsonObj.Countries[181].TotalDeaths;
              var totalRecovered = jsonObj.Countries[181].TotalRecovered;
  
              var newCasesSpaces = numberWithSpaces(newCases);
              var newDeathsSpaces = numberWithSpaces(newDeaths);
              var newRecoveredSpaces = numberWithSpaces(newRecovered);
              var totalCasesSpaces = numberWithSpaces(totalCases);
              var totalDeathsSpaces = numberWithSpaces(totalDeaths);
              var totalRecoveredSpaces = numberWithSpaces(totalRecovered);

              var date = jsonObj.Countries[181].Date;
              var dateClean = "";

              for (i = 0; i < 10; i++) {
              dateClean += date[i];
              }
    
              var table = '<div class="card" style="background-color: white;"><div class="card-body"><h2 class="card-title"> ' + countryName + '<br>' + dateClean + '</h2><table>';
              table += '<tr>';
              table += '<td><div class="card text-center" style="background-color: rgb(255, 218, 214);"><div class="card-body"><h5 class="card-title">New cases</h5><ion-icon name="bag-add"></ion-icon><br><strong>' + newCasesSpaces + '</strong></div></div></td>';
              table += '<td><div class="card text-center" style="background-color: rgb(207, 207, 207);"><div class="card-body"><h5 class="card-title">New deaths</h5><ion-icon name="skull"></ion-icon><br><strong>' + newDeathsSpaces + '</strong></div></div></td>';
              table += '<td><div class="card text-center" style="background-color: rgb(219, 255, 239);"><div class="card-body"><h5 class="card-title">New recoveries</h5><ion-icon name="happy"></ion-icon><br><strong>' + newRecoveredSpaces + '</strong></div></div></td>';
              table += '</tr>';
              table += '<tr>';
              table += '<td><div class="card text-center" style="background-color: rgb(255, 218, 214);"><div class="card-body"><h5 class="card-title">Total cases</h5><ion-icon name="bag-add"></ion-icon><br><strong>' + totalCasesSpaces + '</strong></div></div></td>';
              table += '<td><div class="card text-center" style="background-color: rgb(207, 207, 207);"><div class="card-body"><h5 class="card-title">Total deaths</h5><ion-icon name="skull"></ion-icon><br><strong>' + totalDeathsSpaces + '</strong></div></div></td>';
              table += '<td><div class="card text-center" style="background-color: rgb(219, 255, 239);"><div class="card-body"><h5 class="card-title">Total recoveries</h5><ion-icon name="happy"></ion-icon><br><strong>' + totalRecoveredSpaces + '</strong></div></div></td>';
              table += '</tr>'
              table += '</table></div></div>';
    
              document.getElementById("readyTable").innerHTML = table;
            }
        }
    }

    //Same for Sweden only the number (165) changes
    else if (country =="Sweden")  {
        var url = "https://api.covid19api.com/summary";
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                
              jsonObj = JSON.parse(xmlhttp.responseText);
    
              console.log(jsonObj.Countries[165]);

              var countryName = jsonObj.Countries[165].Country;

              var newCases = jsonObj.Countries[165].NewConfirmed;
              var newDeaths = jsonObj.Countries[165].NewDeaths;
              var newRecovered = jsonObj.Countries[165].NewRecovered;
              var totalCases = jsonObj.Countries[165].TotalConfirmed;
              var totalDeaths = jsonObj.Countries[165].TotalDeaths;
              var totalRecovered = jsonObj.Countries[165].TotalRecovered;
  
              var newCasesSpaces = numberWithSpaces(newCases);
              var newDeathsSpaces = numberWithSpaces(newDeaths);
              var newRecoveredSpaces = numberWithSpaces(newRecovered);
              var totalCasesSpaces = numberWithSpaces(totalCases);
              var totalDeathsSpaces = numberWithSpaces(totalDeaths);
              var totalRecoveredSpaces = numberWithSpaces(totalRecovered);

              var date = jsonObj.Countries[165].Date;
              var dateClean = "";

              for (i = 0; i < 10; i++) {
              dateClean += date[i];
              }
    
              var table = '<div class="card" style="background-color: white;"><div class="card-body"><h2 class="card-title"> ' + countryName + ' ' + dateClean + '</h2><table>';
              table += '<tr>';
              table += '<td><div class="card text-center" style="background-color: rgb(255, 218, 214);"><div class="card-body"><h5 class="card-title">New cases</h5><ion-icon name="bag-add"></ion-icon><br><strong>' + newCasesSpaces + '</strong></div></div></td>';
              table += '<td><div class="card text-center" style="background-color: rgb(207, 207, 207);"><div class="card-body"><h5 class="card-title">New deaths</h5><ion-icon name="skull"></ion-icon><br><strong>' + newDeathsSpaces + '</strong></div></div></td>';
              table += '<td><div class="card text-center" style="background-color: rgb(219, 255, 239);"><div class="card-body"><h5 class="card-title">New recoveries</h5><ion-icon name="happy"></ion-icon><br><strong>' + newRecoveredSpaces + '</strong></div></div></td>';
              table += '</tr>';
              table += '<tr>';
              table += '<td><div class="card text-center" style="background-color: rgb(255, 218, 214);"><div class="card-body"><h5 class="card-title">Total cases</h5><ion-icon name="bag-add"></ion-icon><br><strong>' + totalCasesSpaces + '</strong></div></div></td>';
              table += '<td><div class="card text-center" style="background-color: rgb(207, 207, 207);"><div class="card-body"><h5 class="card-title">Total deaths</h5><ion-icon name="skull"></ion-icon><br><strong>' + totalDeathsSpaces + '</strong></div></div></td>';
              table += '<td><div class="card text-center" style="background-color: rgb(219, 255, 239);"><div class="card-body"><h5 class="card-title">Total recoveries</h5><ion-icon name="happy"></ion-icon><br><strong>' + totalRecoveredSpaces + '</strong></div></div></td>';
              table += '</tr>'
              table += '</table></div></div>';
    
              document.getElementById("readyTable").innerHTML = table;
            }
        }
    }

    //Same for Brazil only the number (23) changes
    else if (country =="Brazil")  {
        var url = "https://api.covid19api.com/summary";
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                
              jsonObj = JSON.parse(xmlhttp.responseText);
    
              console.log(jsonObj.Countries[23]);

              var countryName = jsonObj.Countries[23].Country;

              var newCases = jsonObj.Countries[23].NewConfirmed;
              var newDeaths = jsonObj.Countries[23].NewDeaths;
              var newRecovered = jsonObj.Countries[23].NewRecovered;
              var totalCases = jsonObj.Countries[23].TotalConfirmed;
              var totalDeaths = jsonObj.Countries[23].TotalDeaths;
              var totalRecovered = jsonObj.Countries[23].TotalRecovered;
  
              var newCasesSpaces = numberWithSpaces(newCases);
              var newDeathsSpaces = numberWithSpaces(newDeaths);
              var newRecoveredSpaces = numberWithSpaces(newRecovered);
              var totalCasesSpaces = numberWithSpaces(totalCases);
              var totalDeathsSpaces = numberWithSpaces(totalDeaths);
              var totalRecoveredSpaces = numberWithSpaces(totalRecovered);

              var date = jsonObj.Countries[23].Date;
              var dateClean = "";

              for (i = 0; i < 10; i++) {
              dateClean += date[i];
              }
    
              var table = '<div class="card" style="background-color: white;"><div class="card-body"><h2 class="card-title"> ' + countryName + ' ' + dateClean + '</h2><table>';
              table += '<tr>';
              table += '<td><div class="card text-center" style="background-color: rgb(255, 218, 214);"><div class="card-body"><h5 class="card-title">New cases</h5><ion-icon name="bag-add"></ion-icon><br><strong>' + newCasesSpaces + '</strong></div></div></td>';
              table += '<td><div class="card text-center" style="background-color: rgb(207, 207, 207);"><div class="card-body"><h5 class="card-title">New deaths</h5><ion-icon name="skull"></ion-icon><br><strong>' + newDeathsSpaces + '</strong></div></div></td>';
              table += '<td><div class="card text-center" style="background-color: rgb(219, 255, 239);"><div class="card-body"><h5 class="card-title">New recoveries</h5><ion-icon name="happy"></ion-icon><br><strong>' + newRecoveredSpaces + '</strong></div></div></td>';
              table += '</tr>';
              table += '<tr>';
              table += '<td><div class="card text-center" style="background-color: rgb(255, 218, 214);"><div class="card-body"><h5 class="card-title">Total cases</h5><ion-icon name="bag-add"></ion-icon><br><strong>' + totalCasesSpaces + '</strong></div></div></td>';
              table += '<td><div class="card text-center" style="background-color: rgb(207, 207, 207);"><div class="card-body"><h5 class="card-title">Total deaths</h5><ion-icon name="skull"></ion-icon><br><strong>' + totalDeathsSpaces + '</strong></div></div></td>';
              table += '<td><div class="card text-center" style="background-color: rgb(219, 255, 239);"><div class="card-body"><h5 class="card-title">Total recoveries</h5><ion-icon name="happy"></ion-icon><br><strong>' + totalRecoveredSpaces + '</strong></div></div></td>';
              table += '</tr>'
              table += '</table></div></div>';
    
              document.getElementById("readyTable").innerHTML = table;
            }
        }
    }
    
    //Same for China only the number (35) changes
    else if (country =="China")  {
        var url = "https://api.covid19api.com/summary";
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                
              jsonObj = JSON.parse(xmlhttp.responseText);
    
              console.log(jsonObj.Countries[35]);

              var countryName = jsonObj.Countries[35].Country;

              var newCases = jsonObj.Countries[35].NewConfirmed;
              var newDeaths = jsonObj.Countries[35].NewDeaths;
              var newRecovered = jsonObj.Countries[35].NewRecovered;
              var totalCases = jsonObj.Countries[35].TotalConfirmed;
              var totalDeaths = jsonObj.Countries[35].TotalDeaths;
              var totalRecovered = jsonObj.Countries[35].TotalRecovered;
  
              var newCasesSpaces = numberWithSpaces(newCases);
              var newDeathsSpaces = numberWithSpaces(newDeaths);
              var newRecoveredSpaces = numberWithSpaces(newRecovered);
              var totalCasesSpaces = numberWithSpaces(totalCases);
              var totalDeathsSpaces = numberWithSpaces(totalDeaths);
              var totalRecoveredSpaces = numberWithSpaces(totalRecovered);

              var date = jsonObj.Countries[35].Date;
              var dateClean = "";

              for (i = 0; i < 10; i++) {
              dateClean += date[i];
              }
    
              var table = '<div class="card" style="background-color: white;"><div class="card-body"><h2 class="card-title"> ' + countryName + ' ' + dateClean + '</h2><table>';
              table += '<tr>';
              table += '<td><div class="card text-center" style="background-color: rgb(255, 218, 214);"><div class="card-body"><h5 class="card-title">New cases</h5><ion-icon name="bag-add"></ion-icon><br><strong>' + newCasesSpaces + '</strong></div></div></td>';
              table += '<td><div class="card text-center" style="background-color: rgb(207, 207, 207);"><div class="card-body"><h5 class="card-title">New deaths</h5><ion-icon name="skull"></ion-icon><br><strong>' + newDeathsSpaces + '</strong></div></div></td>';
              table += '<td><div class="card text-center" style="background-color: rgb(219, 255, 239);"><div class="card-body"><h5 class="card-title">New recoveries</h5><ion-icon name="happy"></ion-icon><br><strong>' + newRecoveredSpaces + '</strong></div></div></td>';
              table += '</tr>';
              table += '<tr>';
              table += '<td><div class="card text-center" style="background-color: rgb(255, 218, 214);"><div class="card-body"><h5 class="card-title">Total cases</h5><ion-icon name="bag-add"></ion-icon><br><strong>' + totalCasesSpaces + '</strong></div></div></td>';
              table += '<td><div class="card text-center" style="background-color: rgb(207, 207, 207);"><div class="card-body"><h5 class="card-title">Total deaths</h5><ion-icon name="skull"></ion-icon><br><strong>' + totalDeathsSpaces + '</strong></div></div></td>';
              table += '<td><div class="card text-center" style="background-color: rgb(219, 255, 239);"><div class="card-body"><h5 class="card-title">Total recoveries</h5><ion-icon name="happy"></ion-icon><br><strong>' + totalRecoveredSpaces + '</strong></div></div></td>';
              table += '</tr>'
              table += '</table></div></div>';
    
              document.getElementById("readyTable").innerHTML = table;
            }
        }
    }
 }

 //Next and final function ables the user to search stats of almost any country by searching it
 //from the inout field with the country's name
 function loadFromSearch() {

  //Taking the users input and placing it to variable
  var syote = document.getElementById("kentta").value;
    //Making sure that the input field isn't empty and taking mesures to prevent it
    if(syote == null || syote == "" || syote.length < 2) {
        //alerting the user to write properly to the input field.
        alert("Can't leave the field empty.")
        return false;
    }
  
  //Defining the url
  var url = "https://api.covid19api.com/country/";
  //adding the users input to the url. If the user enters the name of the country correctly and it is on the database, then this will work
  url += syote;

    //again connecting to the api and fetching wanted data
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            
          jsonObj = JSON.parse(xmlhttp.responseText);

          //logging the data to console for inspection
          console.log(jsonObj);

          //using this variable to get the latest data possible
          var resentDay = jsonObj.length - 1;

          //Placing the wanted data to variables
          var activeCases = jsonObj[resentDay].Active
          var totalCases = jsonObj[resentDay].Confirmed
          var totalDeaths = jsonObj[resentDay].Deaths
          var totalRecovered = jsonObj[resentDay].Recovered

          //Again using the function to add spaces  between the numbers
          var activeCasesSpaces = numberWithSpaces(activeCases);
          var totalCasesSpaces = numberWithSpaces(totalCases);
          var totalDeathsSpaces = numberWithSpaces(totalDeaths);
          var totalRecoveredSpaces = numberWithSpaces(totalRecovered);

          //Placing the name of the country api returns to variable
          var countryName = jsonObj[resentDay].Country;
          //Getting the latest date and making in pretty again
          var date = jsonObj[resentDay].Date;
          var dateClean = "";

          for (i = 0; i < 10; i++) {
            dateClean += date[i];
          }

          //Very similiar table as above using bootsrap and ionic icons again. Altough these api searches gives less data so the table only has four <td> elements
          var table = '<div class="card" style="background-color: white;"><div class="card-body"><h2 class="card-title"> ' + countryName + ' ' + dateClean +  '</h2><table>';
              table += '<tr>';
              table += '<td><div class="card text-center" style="background-color: rgb(255, 218, 214);"><div class="card-body"><h5 class="card-title">Active cases</h5><ion-icon name="bag-add"></ion-icon><br><strong>' + activeCasesSpaces + '</strong></div></div></td>';
              table += '<td><div class="card text-center" style="background-color: rgb(255, 218, 214);"><div class="card-body"><h5 class="card-title">Total cases</h5><ion-icon name="bag-add"></ion-icon><br><strong>' + totalCasesSpaces + '</strong></div></div></td>';
              table += '</tr>';
              table += '<tr>';
              table += '<td><div class="card text-center" style="background-color: rgb(207, 207, 207);"><div class="card-body"><h5 class="card-title">Total deaths</h5><ion-icon name="skull"></ion-icon><br><strong>' + totalDeathsSpaces + '</strong></div></div></td>';
              table += '<td><div class="card text-center" style="background-color: rgb(219, 255, 239);"><div class="card-body"><h5 class="card-title">Total recoveries</h5><ion-icon name="happy"></ion-icon><br><strong>' + totalRecoveredSpaces + '</strong></div></div></td>';
              table += '</tr>'
              table += '</table></div></div>';

          document.getElementById("readyTable").innerHTML = table;

          //Clearing the input field after search
          document.getElementById("kentta").value = "";
        }
    }
}

//Selecting the search button, global situation button ang the dropdown select by ID and placing them to variables
var countrySearch = document.getElementById("countrySearch");
var globalSearch = document.getElementById("globalSearch");
var selectCountry = document.getElementById("selectCountry");

//Adding event listener to the search button, that executes the "loadFromSearch()" function when clicked
countrySearch.addEventListener("click", function lfs(){
  loadFromSearch();
}
);

//Adding event listener to the global situation button, that executes the "loadGlobal()" function when clicked
globalSearch.addEventListener("click", function lg(){
  loadGlobal();
}
);

//Adding event listener to the dropdown select, that executes the "chooceCountry()" function when value is changed.
selectCountry.addEventListener("change", function cc(){
  chooceCountry();
}
);

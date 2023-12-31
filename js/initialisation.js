const ctx = {
  width: 960,
  height: 540,
  date: 2000,
  statCountry: "France",
  countryCode: "FRA",
};

function createViz() {
  console.log("Using D3 v" + d3.version);

  CreateHeader();
  CreateMap();
  CreateStats();
  LoadData();
  CreateComparaison();
  InitialiseStats();
  loadDataEducation();
  loadRegime();
}

function loadRegime() {
  d3.csv("data/Regimes.csv")
    .then(function (data) {
      let arr = {};
      let n = 0;
      data.forEach((element) => {
        n = element["Political regime"];
        if (n == 0) {
          arr[element.Code] = "Autocratie fermée";
        }
        if (n == 1) {
          arr[element.Code] = "Autocratie ouverte";
        }
        if (n == 2) {
          arr[element.Code] = "Démocratie électorale";
        }
        if (n == 3) {
          arr[element.Code] = "Democratie libérale";
        }
      });
      ctx.regime = arr;
    })
    .catch(function (err) {
      console.log(err);
    });
}

function CreateHeader() {
  let loopCheckboxChecked = false;
  let svg = d3
    .select("#header")
    .append("svg")
    .attr("width", 800)
    .attr("heigth", 10);

  svg
    .append("text")
    .text("Sustainable Development Goals and world statistics")
    .style("font-size", "30px")
    .style("font-weight", "thin")
    .attr("y", 30)
    .attr("stroke", "green");

  svg
    .append("text")
    .html("Alex Dembélé, Paul Poirmeur, Lorenzo Perrier de La Bâthie")
    .attr("font-style", "italic")
    .style("font-size", "15px")
    .style("font-weight", "thin")
    .attr("y", 50);

  svg
    .append("text")
    .text("Critère SDG : ")
    .style("font-size", "15px")
    .attr("y", 80)
    .attr("stroke", "blue");

  svg
    .append("rect")
    .attr("height", 20)
    .attr("width", 20)
    .attr("y", 67)
    .attr("x", 100)
    .attr("fill", "black")
    .on("mouseover", function (event, d) {
      d3.select(this).style("opacity", 0.5);

      let image = d3
        .select("#header")
        .append("img")
        .attr("id", "pictoSDG")
        .attr("src", "../Image/sdg_banner.jpg")
        .attr("alt", "pictogramme sdg")
        .attr("width", 300)
        .attr("height", 150)
        .style("opacity", 1)
        .style("position", "absolute")
        .style("top", "200%")
        .style("left", "40%")
        .style("transform", "translate(-50%, -50%)")
        .style("transform", "scale(3)");
    })
    .on("mouseout", function (event, d) {
      d3.select(this).style("opacity", 1);
      d3.select("#pictoSDG").remove();
    });

  //glider
  let labelGlider = d3
    .select("#fixed-header")
    .append("label")
    .attr("id", "labelGliderAnnee")
    .text("Year : 2000 ")
    .style("display", "block") // Make it a block element
    .style("text-align", "center"); // Center the label;

  let slider = d3
    .select("#fixed-header")
    .append("input")
    .attr("type", "range")
    .attr("id", "year-picker-input")
    .attr("min", "2000")
    .attr("max", "2022")
    .attr("value", "2000")
    .attr("step", "1") // Set the step increment to 1 year
    .style("width", "50%") // Set the width of the slider
    .style("margin", "auto") // Center the slider
    .style("display", "block") // Make it a block element
    .on("input", function () {
      changeDate();
    });

  // Add a container div
  let checkboxContainer = d3.select("#fixed-header").append("div");

  // Add a checkbox
  let checkbox = checkboxContainer
    .append("input")
    .attr("type", "checkbox")
    .attr("id", "loop-checkbox")

    .on("change", function () {
      // Update the checkbox status when it changes
      console.log(loopCheckboxChecked);
      loopCheckboxChecked = this.checked;
      if (loopCheckboxChecked) {
        loopSlider();
      }
    });

  // Add a label to the right of the checkbox
  checkboxContainer
    .append("label")
    .attr("for", "loop-checkbox")
    .text("Loop Time")
    .style("margin-left", "5px"); // Adjust the margin as needed

  svg
    .append("rect")
    .attr("id", "change")
    .attr("height", 26)
    .attr("width", 142)
    .attr("y", 64)
    .attr("x", 198)
    .attr("fill", "#d3d3d3")
    .on("mouseover", function (event, d) {
      d3.selectAll("#change").style("opacity", 0.5);
    })
    .on("mouseout", function (event, d) {
      d3.selectAll("#change").style("opacity", 1);
    })
    .on("click", function (event, d) {
      window.location.href = "http://localhost:9999/multiligne.html";
    });

  svg
    .append("text")
    .text("Graphe Multiligne")
    .attr("id", "change")
    .attr("y", 80)
    .attr("x", 200)
    .on("mouseover", function (event, d) {
      d3.selectAll("#change").style("opacity", 0.5);
    })
    .on("mouseout", function (event, d) {
      d3.selectAll("#change").style("opacity", 1);
    })
    .on("click", function (event, d) {
      window.location.href = "http://localhost:9999/multiligne.html";
    });

  // Function to handle slider looping
  // Function to handle slider looping
  let loopTimer;
  function loopSlider() {
    let currentValue = +slider.property("value");
    let maxValue = +slider.attr("max");

    if (loopCheckboxChecked) {
      // Check if the loop is enabled
      if (currentValue === maxValue) {
        // If at the maximum value, loop back to the minimum value
        slider.property("value", +slider.attr("min")).dispatch("input");
        labelGlider.text("Year : " + slider.property("min"));
      } else {
        // Increment the slider value
        slider.property("value", currentValue + 1).dispatch("input");
        labelGlider.text("Year : " + (currentValue + 1));
      }

      // Clear existing timer and start a new one
      clearTimeout(loopTimer);
      loopTimer = setTimeout(loopSlider, 500); // Adjust the delay as needed
    }

    // Call the changeDate function when the slider value changes
    changeDate();
  }
}

function CreateMap() {
  // Création de la projection géographique
  var projection = d3
    .geoMercator()
    .scale(120)
    .translate([ctx.width / 2, ctx.height / 1.5]);

  var path = d3.geoPath().projection(projection);

  // Ajout de la carte au conteneur SVG
  var svg = d3
    .select("#main")
    .style("fill", "rgb(211, 211, 211)")
    .append("svg")
    .attr("width", ctx.width)
    .attr("height", ctx.height)
    .attr("transform", "translate(-80,10)");

  let gradient = svg
    .append("defs")
    .append("linearGradient")
    .attr("id", "gradient")
    .attr("x1", "100%") // Début du dégradé à 0% (gauche)
    .attr("x2", "0%"); // Fin du dégradé à 100% (droite)

  gradient.append("stop").attr("offset", "0%").attr("stop-color", "green"); // Vert

  gradient.append("stop").attr("offset", "50%").attr("stop-color", "white"); // Blanc au milieu

  gradient.append("stop").attr("offset", "100%").attr("stop-color", "red"); // Rouge

  svg
    .append("rect")
    .attr("width", 90)
    .attr("height", 160)
    .attr("x", 100)
    .attr("y", 400)
    .attr("height", 20)
    .style("fill", "url(#gradient)");

  let echelleScale = d3
    .scaleLinear()
    .domain([0, 100]) // Les points de référence pour les couleurs
    .range([0, 100]); // Les couleurs correspondantes

  let axeX = d3.axisBottom(echelleScale);
  axeX.ticks(5);
  svg
    .append("g")
    .attr("transform", "translate(100, 430)") // Déplacer l'axe au bas du SVG
    .call(axeX);

  svg
    .append("text")
    .text("SDG Global Score")
    .attr("stroke", "black")
    .style("font-size", "13px")
    .attr("x", 100)
    .attr("y", 380);

  d3.json("data/country-110m.json").then(function (world) {
    //Construction carte
    svg
      .selectAll("path")
      .data(topojson.feature(world, world.objects.countries).features)
      .enter()
      .append("path")
      .attr("d", path)
      //gestion souris
      .on("click", function (event, d) {
        console.log("Pays cliqué :", d.properties.name);
        ctx.statCountry = d.properties.name;
        ctx.countryCode = d.properties.code;
        //UPDATE COMPARAISON
        if (
          cty.countries.includes(ctx.statCountry) &
          !cty.listePays.includes(ctx.statCountry)
        ) {
          cty.listePays.push(ctx.statCountry);
          updateComparaison(ctx.data);
        }

        updateStats(ctx.data);
      })
      .on("mouseover", function (d) {
        d3.select(this).style("opacity", 0.5);
      })
      .on("mouseout", function (d) {
        d3.select(this).style("opacity", 1);
      });
  });
}

function LoadData() {
  d3.csv("data/sdg_index_2000-2022.csv")
    .then(function (data) {
      ctx.data = data;

      ColorMap(data);
    })
    .catch(function (err) {
      console.log(err);
    });
  //creation array drapeau
  d3.csv("data/flag.csv")
    .then(function (data) {
      ctx.flag = {};
      ctx.subregion = {};
      data.forEach((element) => {
        ctx.flag[element.country] = element.image_url;
        ctx.subregion[element.country] = element["sub-region"];
      });
    })
    .catch(function (err) {
      console.log(err);
    });
}

function ColorMap(data) {
  let sdgColorScale = d3
    .scaleLinear()
    .domain([0, 50, 100]) // Les points de référence pour les couleurs
    .range(["red", "white", "green"]); // Les couleurs correspondantes
  //Colore la map avec le sdg_index_score
  let paysIndex = {};

  data.forEach((element) => {
    if (element.year == ctx.date) {
      paysIndex[element.country] = { sdg_index: element.sdg_index_score };
    }
  });

  d3.select("#main")
    .selectAll("path")
    .style("fill", function (d) {
      if (paysIndex[d.properties.name] != undefined) {
        return sdgColorScale(paysIndex[d.properties.name].sdg_index);
      } else {
        return "black";
      }
    });
  updateStats(data);
}

function CreateStats(data) {
  //Svg de la partie statistique
  let rec = d3
    .select("#stats")
    .append("svg")
    .attr("width", 800)
    .attr("height", 540);
  // .attr("transform", "translate(800,-540)");

  // FOnd de la partie statistique
  rec
    .append("rect")
    .attr("width", 800)
    .attr("height", 540)
    .attr("fill", "lime")
    .style("opacity", 0.1);

  //Titre de la partie statistique

  rec
    .append("rect")
    .attr("width", 135)
    .attr("height", 30)

    .attr("fill", "green")
    .style("opacity", 0.8);

  rec
    .append("text")
    .attr("x", 5)
    .attr("y", 20)
    .text("Statistiques")
    .style("font-size", "24px")
    .style("font-weight", "bold");

  // Label Bonheur
  rec
    .append("text")
    .attr("x", 220)
    .attr("y", 500)
    .text("Bonheur")
    .style("font-size", "24px")
    .style("font-weight", "bold");
  //Nom du pays dont on va montrer les stats
  rec
    .append("rect")
    .attr("width", 160)
    .attr("height", 30)
    .attr("x", 135)
    .attr("fill", "green")
    .style("opacity", 0.6);

  rec
    .append("text")
    .attr("x", 150)
    .attr("y", 20)
    .attr("id", "countryName")
    .text(ctx.statCountry)
    .style("font-size", "18px")
    .style("font-weight", "bold")
    .style("fill", "blue");

  //drapeau du pays
  let image = rec
    .append("image")
    .attr("id", "drapeau")
    .attr(
      "xlink:href",
      "https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg"
    )
    .attr("width", 64)
    .attr("height", 36)
    .attr("x", 150)
    .attr("y", 35);

  //sub-region
  rec
    .append("rect")
    .attr("width", 300)
    .attr("height", 30)
    .attr("x", 294)
    .attr("fill", "green")
    .style("opacity", 0.6);

  rec
    .append("text")
    .attr("x", 300)
    .attr("y", 20)
    .attr("id", "regionName")
    .text("Western Europe")
    .style("font-size", "18px")
    .style("font-weight", "bold")
    .style("fill", "blue");

  //surface
  rec
    .append("rect")
    .attr("width", 300)
    .attr("height", 30)
    .attr("x", 594)
    .attr("fill", "green")
    .style("opacity", 0.4);

  rec
    .append("text")
    .attr("x", 600)
    .attr("y", 20)
    .attr("id", "surfaceCountry")
    .text("0")
    .style("font-size", "18px")
    .style("font-weight", "bold")
    .style("fill", "blue");

  //regime politique
  rec
    .append("rect")
    .attr("width", 300)
    .attr("height", 30)
    .attr("x", 594)
    .attr("y", 30)
    .attr("fill", "#32F9E4")
    .style("opacity", 0.4);

  rec
    .append("text")
    .attr("x", 600)
    .attr("y", 50)
    .attr("id", "regime")
    .text("Regime")
    .style("font-size", "18px")
    .style("font-weight", "bold")
    .style("fill", "blue");

  //PIB

  rec
    .append("rect")
    .attr("width", 300)
    .attr("height", 30)
    .attr("x", 594)
    .attr("y", 60)
    .attr("fill", "#F9A232")
    .style("opacity", 0.4);

  rec
    .append("text")
    .attr("x", 600)
    .attr("y", 80)
    .attr("id", "PIBtext")
    .text("PIB/hab(USD) : ")
    .style("font-size", "18px")
    .style("font-weight", "bold")
    .style("fill", "blue");

  //population
  rec
    .append("rect")
    .attr("width", 300)
    .attr("height", 30)
    .attr("x", 594)
    .attr("y", 90)
    .attr("fill", "#AF69F9")
    .style("opacity", 0.4);

  rec
    .append("text")
    .attr("x", 600)
    .attr("y", 110)
    .attr("id", "Populationtext")
    .text("Population : ")
    .style("font-size", "18px")
    .style("font-weight", "bold")
    .style("fill", "blue");

  //esperance de Vie
  rec
    .append("rect")
    .attr("width", 300)
    .attr("height", 30)
    .attr("x", 594)
    .attr("y", 120)
    .attr("fill", "#FA6F6F")
    .style("opacity", 0.4);

  rec
    .append("text")
    .attr("x", 600)
    .attr("y", 140)
    .attr("id", "Vietext")
    .text("Age moyen : ")
    .style("font-size", "18px")
    .style("font-weight", "bold")
    .style("fill", "blue");

  //RNB
  rec
    .append("rect")
    .attr("width", 300)
    .attr("height", 30)
    .attr("x", 594)
    .attr("y", 150)
    .attr("fill", "#FAF86F")
    .style("opacity", 0.4);

  rec
    .append("text")
    .attr("x", 600)
    .attr("y", 170)
    .attr("id", "RNBtext")
    .text("RNB(USD) : ")
    .style("font-size", "18px")
    .style("font-weight", "bold")
    .style("fill", "blue");

  //Energ
  rec
    .append("rect")
    .attr("width", 300)
    .attr("height", 30)
    .attr("x", 594)
    .attr("y", 180)
    .attr("fill", "#8CD5F7")
    .style("opacity", 0.4);

  rec
    .append("text")
    .attr("x", 600)
    .attr("y", 200)
    .attr("id", "Energietext")
    .text("Energie : ")
    .style("font-size", "18px")
    .style("font-weight", "bold")
    .style("fill", "blue");
  //Education
  rec
    .append("rect")
    .attr("width", 300)
    .attr("height", 30)
    .attr("x", 594)
    .attr("y", 210)
    .attr("fill", "#F78CE7")
    .style("opacity", 0.4);

  rec
    .append("text")
    .attr("x", 600)
    .attr("y", 230)
    .attr("id", "Edutext")
    .text("Education : ")
    .style("font-size", "18px")
    .style("font-weight", "bold")
    .style("fill", "blue");

  //emission CO2
  rec
    .append("rect")
    .attr("width", 300)
    .attr("height", 30)
    .attr("x", 594)
    .attr("y", 240)
    .attr("fill", "#F93134")
    .style("opacity", 0.4);

  rec
    .append("text")
    .attr("x", 600)
    .attr("y", 260)
    .attr("id", "CO2text")
    .text("Emission CO2 : ")
    .style("font-size", "18px")
    .style("font-weight", "bold")
    .style("fill", "blue");

  //chomage
  rec
    .append("rect")
    .attr("width", 300)
    .attr("height", 30)
    .attr("x", 594)
    .attr("y", 270)
    .attr("fill", "#B5B9B5")
    .style("opacity", 0.4);

  rec
    .append("text")
    .attr("x", 600)
    .attr("y", 290)
    .attr("id", "chomagetext")
    .text("Chomage(%) : ")
    .style("font-size", "18px")
    .style("font-weight", "bold")
    .style("fill", "blue");
}

function InitialiseStats(data) {
  initialiseRadarChart();
  initialiseBarChart();
}

function updateStats(data) {
  let svg = d3.select("#stats svg");

  // On moddifie le nom du pays étudié
  d3.select("#countryName").text(ctx.statCountry);
  d3.select("#drapeau").attr("xlink:href", ctx.flag[ctx.statCountry]);
  d3.select("#regionName").text(ctx.subregion[ctx.statCountry]);
  let pays = ctx.statCountry;
  d3.select("#surfaceCountry").text(
    "Surface(km²) : " + ctc.data.surface[ctx.countryCode][ctx.date]
  );
  d3.select("#regime").text(ctx.regime[ctx.countryCode]);
  console.log(ctc.data.PIB[ctx.countryCode][ctx.date]);
  d3.select("#PIBtext").text(
    "PIB/hab(USD) : " +
      ctc.data.PIBHabitant[ctx.countryCode][ctx.date].toString() +
      " USD"
  );
  d3.select("#Populationtext").text(
    "Population : " + ctc.data.population[ctx.countryCode][ctx.date].toString()
  );
  d3.select("#Vietext").text(
    "Age moyen : " +
      ctc.data.esperanceVie[ctx.countryCode][ctx.date].toString() +
      " ans"
  );
  d3.select("#RNBtext").text(
    "RNB(USD) : " + ctc.data.RNB[ctx.countryCode][ctx.date].toString()
  );
  d3.select("#Energietext").text(
    "Energie : " + ctc.data.energie[ctx.countryCode][ctx.date].toString()
  );
  d3.select("#Edutext").text(
    "Education : " + ctc.data.education[ctx.countryCode][ctx.date].toString()
  );
  d3.select("#CO2text").text(
    "Emission CO2 : " + ctc.data.emission[ctx.countryCode][ctx.date].toString()
  );
  d3.select("#chomagetext").text(
    "Chomage(%) : " + ctc.data.chomage[ctx.countryCode][ctx.date].toString()
  );

  updateRadarChart();
  // updatePIB();
  // updatePIBchart();
}

function changeDate() {
  let annee = parseInt(d3.select("#year-picker-input").property("value"));
  if (annee >= 2000 && annee <= 2022) {
    ctx.date = annee;
    ColorMap(ctx.data);
    updateComparaison(ctx.data);
  }
  let label = d3.select("#labelGliderAnnee").text(`Year : ${ctx.date}`);
  console.log(annee);
}

const cty = {
  listePays: [],
  selectedGoals: [],
  colorScale: d3
    .scaleOrdinal()
    .domain(d3.range(20)) // Use a larger range for more colors
    .range(d3.schemeCategory10),
  countries: [],
  goalDescription: [
    "Goal 1 : Eradicate poverty in all its forms and everywhere in the world",
    "Goal 2 : End hunger, ensure food security, improve nutrition and promote sustainable agriculture",
    "Goal 3 : Enable everyone to live in good health and promote the well-being of all at all ages",
    "Goal 4 : Ensuring equitable, inclusive and quality education and lifelong learning opportunities for all",
    "Goal 5 : Achieve gender equality and empower all women and girls",
    "Goal 6 : Guarantee access for all to sustainably managed water supply and sanitation services",
    "Goal 7 : Guarantee access for all to reliable, sustainable and modern energy services, at an affordable cost",
    "Goal 8 : Promote sustained, shared and sustainable economic growth, full and productive employment and decent work for all",
    "Goal 9 : Building resilient infrastructure, promoting sustainable industrialization that benefits everyone, and encouraging innovation",
    "Goal 10 : Reduce inequalities within and across countries",
    "Goal 11 : Making cities and human settlements inclusive, safe, resilient and sustainable",
    "Goal 12 : Establish sustainable consumption and production patterns",
    "Goal 13 : Take urgent action to combat climate change and its impacts",
    "Goal 14 : Conserve and sustainably use the oceans, seas and marine resources for sustainable development",
    "Goal 15 : Preserve and restore terrestrial ecosystems, ensuring they are used sustainably, sustainably manage forests, combat desertification, halt and reverse the process of land degradation and put an end to the loss of biodiversity",
    "Goal 16 : Promote the advent of peaceful and inclusive societies for the purposes of sustainable development, ensure access to justice for all and establish, at all levels, effective, accountable institutions open to all",
    "Goal 17 : Strengthen the means to implement and revitalize the Global Partnership for Sustainable Development",
  ],
};

function CreateComparaison() {
  let rec = d3
    .select("#compare")
    .append("svg")
    .attr("width", 1600)
    .attr("height", 540)
    .attr("transform", "translate(0,0)")
    .attr("id", "parallel-plot-space");

  rec
    .append("rect")
    .attr("width", 1600)
    .attr("height", 540)
    .attr("fill", "light blue")
    .style("opacity", 0.1);

  rec
    .append("rect")
    .attr("width", 1600)
    .attr("height", 30)
    .attr("fill", "#98A3FC")
    .style("opacity", 0.6);

  rec
    .append("text")
    .attr("x", 5)
    .attr("y", 20)
    .text("Comparaison")
    .style("font-size", "24px")
    .style("font-weight", "bold");

  d3.csv("data/sdg_index_2000-2022.csv")
    .then(function (fixedData) {
      CreateSelecteur(fixedData);
    })
    .catch(function (err) {
      console.log(err);
    });
}

function CreateSelecteur(data) {
  let compare = d3.select("#compare").append("g");

  let selecteur1 = compare
    .append("select")
    .attr("y", 0)
    .attr("id", "countrySelector1");

  let selecteur2 = compare
    .append("select")
    .attr("y", 0)
    .attr("id", "countrySelector2");
  let selecteur3 = compare.append("div").attr("id", "goalSelector");
  let goals = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    "global",
    "All goals",
  ];

  let countriesSet = new Set(data.map((d) => d.country));
  cty.countries = Array.from(countriesSet);
  // Sort the countries alphabetically

  cty.countries.sort();
  cty.countries.unshift("Sélectionnez un pays");

  selecteur1
    .selectAll("myOptions")
    .data(cty.countries)
    .enter()
    .append("option")
    .text(function (d) {
      return d;
    })
    .attr("value", function (d) {
      return d;
    });

  selecteur2
    .selectAll("myOptions")
    .data(cty.countries)
    .enter()
    .append("option")
    .text(function (d) {
      return d;
    })
    .attr("value", function (d) {
      return d;
    });

  // Ajouter une seule checkbox pour "Tous les pays"
  compare
    .insert("input", "#countrySelector1")
    .attr("type", "checkbox")
    .attr("id", "selectAllCountries")
    .attr("class", "selectAllCheckbox")
    .on("change", function () {
      // Vérifier si la case "Tous les pays" est cochée
      const isChecked = d3.select(this).property("checked");

      // Mettre à jour la liste des pays en fonction de l'état de la case
      if (isChecked) {
        cty.listePays = cty.countries.slice(1); // Exclure "Sélectionnez un pays"
      } else {
        cty.listePays = [];
      }

      // Appeler la fonction de mise à jour de la comparaison
      updateComparaison(data);
    });

  compare
    .insert("label", "#countrySelector1")
    .attr("for", "selectAllCountries")
    .text("Tous les pays");

  let goalContainer = selecteur3.append("div");
  goalContainer.append("div").text("Sélectionnez des Objectifs");
  let goalCheckboxes = goalContainer
    .selectAll("myOptions")
    .data(goals)
    .enter()
    .append("div")
    .attr("class", "checkbox-container");
  goalCheckboxes
    .style("display", "inline-block")
    .append("input")
    .attr("type", "checkbox")
    .attr("id", function (d) {
      return "checkbox_" + d;
    })
    .attr("value", function (d) {
      return d;
    })
    .on("change", function () {
      if (d3.select(this).property("value") === "All goals") {
        let isChecked = d3.select(this).property("checked");
        d3.selectAll("[id^='checkbox_']").property("checked", isChecked);
        cty.selectedGoals = isChecked ? goals.slice(0, -1) : [];
        updateComparaison(data);
      } else {
        let checkedGoals = goals.filter((goal) => {
          let checkbox = d3.select("#checkbox_" + goal);
          return checkbox.size() > 0 && checkbox.property("checked");
        });
        // console.log(checkedGoals);
        cty.selectedGoals = checkedGoals;
        updateComparaison(data);
      }
    });

  goalCheckboxes
    .append("label")
    .attr("for", function (d) {
      return "checkbox_" + d;
    })
    .text(function (d) {
      return d;
    });

  selecteur1.on("change", function () {
    if (d3.select(this).property("value") !== "Sélectionnez un pays") {
      cty.listePays[0] = d3.select(this).property("value");
      updateComparaison(data);
      d3.select(this)
        .selectAll("option[value='Sélectionnez un pays']")
        .property("disabled", true);
    }
  });

  selecteur2.on("change", function () {
    if (d3.select(this).property("value") !== "Sélectionnez un pays") {
      cty.listePays[1] = d3.select(this).property("value");
      updateComparaison(data);
      d3.select(this)
        .selectAll("option[value='Sélectionnez un pays']")
        .property("disabled", true);
    }
  });

  cty.selecteur1 = d3.select("#countrySelector1");
  cty.selecteur2 = d3.select("#countrySelector2");
  cty.selecteur3 = d3.select("#goalSelector");
}

function updateComparaison(data) {
  // Filter the data based on the selected countries
  let filteredData = Array.from({ length: cty.listePays.length }, (_, i) =>
    data.find((d) => d.country === cty.listePays[i] && d.year == ctx.date)
  );
  //   console.log(filteredData);
  // Filter the data based on the selected goals
  if (cty.selectedGoals.length > 0) {
    filteredData = filteredData.map((d) => {
      let newD = { country: d.country };
      cty.selectedGoals.forEach((goal) => {
        if (goal == "global") {
          newD[`goal_${goal}_score`] =
            d[ctx.date == 2023 ? `overall_score` : "sdg_index_score"];
        } else {
          newD[`goal_${goal}_score`] = d[`goal_${goal}_score`];
        }
      });
      return newD;
    });
  }

  //   console.log(filteredData);
  // Set up parallel plot dimensions
  const dimensions = cty.selectedGoals.map((goal) => `goal_${goal}_score`);

  // Remove existing parallel plot SVG
  d3.select("#parallel-plot").remove();

  // Create parallel plot SVG
  const margin = { top: 40, right: 20, bottom: 30, left: 100 };
  const width = 1600 - margin.left - margin.right;
  const height = 540 - margin.top - margin.bottom;

  const parallelPlot = d3
    .select("#parallel-plot-space")
    .append("svg")
    .attr("id", "parallel-plot")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Create scales for each dimension
  const scales = {};
  dimensions.forEach((dim, i) => {
    scales[dim] = d3
      .scaleLinear()
      .domain([0, 100]) // Set the domain to [0, 100]
      .range([height, 0]);

    // Create a vertical axis for each dimension
    const axis = d3.axisLeft(scales[dim]);
    parallelPlot
      .append("g")
      .attr("class", "axis")
      .attr(
        "transform",
        "translate(" + (i * ((width - 100) / dimensions.length) + 100) + ",0)"
      )
      .call(axis);

    // Add labels underneath each axis
    parallelPlot
      .append("text")
      .attr("class", "axis-label")
      .attr(
        "transform",
        "translate(" +
          (i * ((width - 100) / dimensions.length) + 100) +
          "," +
          (height + margin.bottom / 1.5) +
          ")"
      )
      .style("text-anchor", "middle")
      .text("Goal " + cty.selectedGoals[i])
      .on("mouseover", function (event) {
        // Print the country name next to the mouse position
        const mouseX = event.pageX + 10;
        const mouseY = event.pageY - 10;

        // Create a div for hover text and append it to the body
        d3.select("body")
          .append("div")
          .attr("class", "hover-label-text")
          .style("position", "absolute")
          .style("left", mouseX + "px")
          .style("top", mouseY + "px")
          .style("padding", "5px")
          .style("background-color", "lightgrey")
          .style("border", "1px solid black") // Add border styling
          .style("border-radius", "5px")
          .style("font-size", "20px")
          .style("fill", "black")
          .text(cty.goalDescription[cty.selectedGoals[i] - 1]);
      })
      .on("mouseout", function () {
        // Remove the country name display
        d3.select("body").selectAll(".hover-label-text").remove();
      });

    // Add dots for each country on the axis
    if (!d3.select("#selectAllCountries").property("checked")) {
      filteredData.forEach((countryData, countryIndex) => {
        const x = i * ((width - 100) / dimensions.length) + 100;
        const y = scales[dim](countryData[dim]);

        parallelPlot
          .append("circle")
          .attr("cx", x)
          .attr("cy", y)
          .attr("r", 5) // Adjust the radius as needed
          .style("fill", cty.colorScale(countryIndex));
      });
    }
  });
  // Calculer les y-coordinates en fonction de la hauteur de la fenêtre
  const yScale = d3
    .scaleLinear()
    .domain([0, filteredData.length - 1]) // Domaine de l'indice des pays dans filteredData
    .range([50, height - 100]); // Plage de hauteurs

  // Set y-coordinates for country names
  const yCoordinates = filteredData.map((d, i) => yScale(i));

  // Add country names on the left side
  if (!d3.select("#selectAllCountries").property("checked")) {
    parallelPlot
      .selectAll(".country-label")
      .data(filteredData)
      .enter()
      .append("text")
      .attr("class", "country-label")
      .text((d) => d.country)
      .attr("x", 50)
      .attr("y", (d, i) => yCoordinates[i])
      .attr("dy", (d, i) => (i === 0 ? -3 : 3)) // Adjust the vertical position
      .style("text-anchor", "end")
      .style("font-size", "15px")
      .style("fill", (d, i) =>
        !d3.select("#selectAllCountries").property("checked")
          ? cty.colorScale(i)
          : "grey"
      );
  } else {
    parallelPlot
      .append("text")
      .text("Tous les pays")
      .attr("x", 50)
      .attr("y", height / 2) // Adjust the vertical position
      .style("text-anchor", "end")
      .style("font-size", "15px")
      .style("fill", "black"); // Adjust the text color as needed
  }

  // Add links between consecutive points on vertical axis
  const lineGroup = parallelPlot.append("g").attr("class", "line-group");

  filteredData.forEach((countryData, countryIndex) => {
    const countryLines = []; // To store all lines corresponding to a country

    for (let i = 1; i < dimensions.length; i++) {
      const x1 = i * ((width - 100) / dimensions.length) + 100;
      const y1 = scales[dimensions[i]](countryData[dimensions[i]]);
      const x2 = (i - 1) * ((width - 100) / dimensions.length) + 100;
      const y2 = scales[dimensions[i - 1]](countryData[dimensions[i - 1]]);

      // Create a line for each link
      const line = lineGroup
        .append("line")
        .attr("x1", x1)
        .attr("y1", y1)
        .attr("x2", x2)
        .attr("y2", y2)
        .style(
          "stroke",
          !d3.select("#selectAllCountries").property("checked")
            ? cty.colorScale(countryIndex)
            : "grey"
        )
        .style("stroke-width", 1)
        .style("opacity", 0.7);

      countryLines.push(line); // Add the line to the countryLines array

      // Add event listeners for hover
      line
        .on("mouseover", function (event) {
          // Thicken all lines corresponding to the country on hover
          countryLines.forEach((countryLine) =>
            countryLine.style("stroke-width", 3)
          );

          // Print the country name next to the mouse position
          const mouseX = event.pageX + 10;
          const mouseY = event.pageY - 10;

          // Create a div for hover text and append it to the body
          d3.select("body")
            .append("div")
            .attr("class", "hover-text")
            .style("position", "absolute")
            .style("left", mouseX + "px")
            .style("top", mouseY + "px")
            .style("padding", "5px")
            .style("background-color", "lightgrey")
            .style("border", "1px solid black") // Add border styling
            .style("border-radius", "5px")
            .style("font-size", "20px")
            .style("fill", "black")
            .text(countryData.country);
        })
        .on("mouseout", function () {
          // Reset the line thickness for all lines corresponding to the country on mouseout
          countryLines.forEach((countryLine) =>
            countryLine.style("stroke-width", 1)
          );
          // Remove the country name display
          d3.select("body").selectAll(".hover-text").remove();
        });
    }
  });
}

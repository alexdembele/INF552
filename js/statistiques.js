cts = {
  maxValue: {},
};

function debug() {}

function initialiseRadarChart() {
  d3.csv("data/bonheur.csv")
    .then(function (data) {
      ctx.happinessData = data;
      //   console.log("test");KC
      happinessData_loc = getRadarChartData(ctx.statCountry, data);
      console.log(happinessData_loc);
      drawRadarChart(happinessData_loc);
    })
    .catch(function (err) {
      console.log(err);
    });
}

function initialiseBarChart() {
  d3.dsv(";", "data/PIB.csv")
    .then(function (data) {
      //   data = data.map((entry) => entry.replace(/;/g, ","));
      cts.PIB = data;
      drawVerticalBar("France", 2020, data, 250, 100, "PIB");
      PIBBarchart("France", data, 250, 350, "PIB");
      // console.log("test");KC
    })
    .catch(function (err) {
      console.log(err);
    });
}

// Sample data for 7 axes (you can replace this with your own data)
function getMaxValues(data) {
  const scores = Object.keys(data[0]).slice(3); // Extract scores columns (starting from index 3)
  const maxValues = {};

  scores.forEach((score, index) => {
    const colValues = data.map((row) => row[score]); // Extract values for each score
    const maxValue = Math.max(...colValues); // Find the maximum value for each score
    maxValues[score] = maxValue; // Store the maximum value for each score
  });

  return maxValues;
}

function getRadarChartData(countryName, data) {
  const countryData = data.find(
    (row) => row["Country or region"] == countryName
  ); // Find data for the selected country
  if (!countryData) return null;

  const scores = Object.keys(countryData).slice(3); // Extract scores columns (starting from index 3)
  const maxValues = getMaxValues(data);

  const radarChartData = scores.map((score) => {
    const normalizedValue = countryData[score] / maxValues[score]; // Calculate relative value compared to the best value
    return { axis: score, value: normalizedValue };
  });

  return radarChartData;
}

// Function to draw the radar chart
function drawRadarChart(data) {
  // Chart configuration
  const width = 300;
  const height = 300;
  const margin = { top: 250, right: 50, bottom: 50, left: 150 };

  // Create SVG element
  let svg = d3
    .select("#stats svg")
    .append("svg")
    .attr("id","diamant")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left+120},${margin.top})`);

  const radius = Math.min(width, height) / 2;

  const angleSlice = (Math.PI * 2) / data.length;

  // Create scales
  const rScale = d3.scaleLinear().domain([0, 1]).range([0, radius]);
  svg.selectAll(".axis").remove();

  ctx.rScaleRadarChart = rScale;
  // Create axes
  let axis = svg
    .selectAll(".axis")
    .data(data)
    .enter()
    .append("g")
    .attr("class", "axis");

  axis
    .append("line")
    .attr(
      "x1",
      (d, i) =>
        rScale(data[(i + data.length - 1) % data.length].value) *
        Math.cos(angleSlice * (i - 1) - Math.PI / 2)
    )
    .attr(
      "y1",
      (d, i) =>
        rScale(data[(i + data.length - 1) % data.length].value) *
        Math.sin(angleSlice * (i - 1) - Math.PI / 2)
    )
    .attr(
      "x2",
      (d, i) => rScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2)
    )
    .attr(
      "y2",
      (d, i) => rScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2)
    )
    .attr("class", "line")
    .style("stroke", "green")
    .style("stroke-width", 4);

  axis
    .selectAll(".ticks")
    .data(data)
    .enter()
    .append("line")
    .attr("class", "scales")
    .attr("x1", 0)
    .attr("y1", 0)
    .attr("x2", (d, i) => rScale(1) * Math.cos(angleSlice * i - Math.PI / 2))
    .attr("y2", (d, i) => rScale(1) * Math.sin(angleSlice * i - Math.PI / 2))
    .style("stroke", "grey");

  axis
    .append("heptagons")
    .data(d3.range(0, data.length * 12))
    .enter()
    .append("line")
    .attr("class", "heptas")
    .attr(
      "x1",
      (d, i) => rScale((d % 11) / 10) * Math.cos(angleSlice * i - Math.PI / 2)
    )
    .attr(
      "y1",
      (d, i) => rScale((d % 11) / 10) * Math.sin(angleSlice * i - Math.PI / 2)
    )
    .attr(
      "x2",
      (d, i) =>
        rScale((d % 11) / 10) * Math.cos(angleSlice * (i + 1) - Math.PI / 2)
    )
    .attr(
      "y2",
      (d, i) =>
        rScale((d % 11) / 10) * Math.sin(angleSlice * (i + 1) - Math.PI / 2)
    )
    .style("stroke", "grey");

  axis
    .append("circle")
    .attr(
      "cx",
      (d, i) => rScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2)
    )
    .attr(
      "cy",
      (d, i) => rScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2)
    )
    .attr("r", 6) // Adjust the radius of the circles as needed
    .attr("class", "point")
    .style("fill", "Green");

  axis
    .append("text")
    .attr("class", "legend")
    .text((d) => d.axis)
    .attr("text-anchor", "middle")
    .attr("dy", "1.5em")
    .attr("x", (d, i) => rScale(1.2) * Math.cos(angleSlice * i - Math.PI / 2))
    .attr("y", (d, i) => rScale(1.2) * Math.sin(angleSlice * i - Math.PI / 2));
}

function updateRadarChart() {
  console.log("test1");
  data = getRadarChartData(ctx.statCountry, ctx.happinessData);

  console.log("test2");
  // Select all existing circles representing data points
  const svg = d3.select("#stats svg");
  const circles = svg.selectAll(".point");
  const lines = svg.selectAll(".line");
  // Select the SVG element where the radar chart is drawn
  if (data == null) {
    console.log("whaaaat");
    circles.each(function (d, i) {
      // Update coordinates of the circle based on new data
      d3.select(this).attr("cx", 0).attr("cy", 0);
    });

    lines.each(function (d, i) {
      // Update coordinates of the circle based on new data
      d3.select(this).attr("x1", 0).attr("y1", 0).attr("x2", 0).attr("y2", 0);
    });
  } else {
    const angleSlice = (Math.PI * 2) / data.length;

    // Create scales
    const rScale = ctx.rScaleRadarChart;

    // Update the coordinates of existing points with new data
    circles.each(function (d, i) {
      const newDataValue = data[i].value; // Get the new value from updated data
      const newX =
        rScale(newDataValue) * Math.cos(angleSlice * i - Math.PI / 2);
      const newY =
        rScale(newDataValue) * Math.sin(angleSlice * i - Math.PI / 2);

      // Update coordinates of the circle based on new data
      d3.select(this)
        .transition() // Start the transition
        .duration(1000)
        .attr("cx", newX)
        .attr("cy", newY);
    });

    lines.each(function (d, i) {
      const newDataValue = data[i].value; // Get the new value from updated data
      const newX1 =
        rScale(data[(i + data.length - 1) % data.length].value) *
        Math.cos(angleSlice * (i - 1) - Math.PI / 2);
      const newY1 =
        rScale(data[(i + data.length - 1) % data.length].value) *
        Math.sin(angleSlice * (i - 1) - Math.PI / 2);
      const newX2 =
        rScale(newDataValue) * Math.cos(angleSlice * i - Math.PI / 2);
      const newY2 =
        rScale(newDataValue) * Math.sin(angleSlice * i - Math.PI / 2);
      // Update coordinates of the circle based on new data
      d3.select(this)
        .transition() // Start the transition
        .duration(1000)
        .attr("x1", newX1)
        .attr("y1", newY1)
        .attr("x2", newX2)
        .attr("y2", newY2);
    });
  }
}

// Call the function to draw the radar chart

// Create bar chart for different values

function drawVerticalBar(countryName, year, rawData, left, top, name) {
  // Filter data for the selected country code and extract the value for the selected year

  const selectedCountryData = rawData.find(
    (entry) => entry["Country Name"] == countryName
  );

  const selectedYearValue = selectedCountryData[year];
  let maxOverall = null;

  rawData.forEach((obj) => {
    Object.keys(obj).forEach((key) => {
      if (!isNaN(obj[key]) && (maxOverall === null || obj[key] > maxOverall)) {
        maxOverall = obj[key];
      }
    });
  });
  maxOverall = 3000000000000;
  cts.maxValue[name] = maxOverall;
  // Find maximum and minimum values for the selected year across all countries

  // Calculate proportional value of selected country's data compared to max and min values
  const proportionalValue = selectedYearValue / maxOverall;

  // Define dimensions for the SVG container and bar
  const width = 50; // Specify the width of the SVG container
  const height = 100; // Specify the height of the SVG container
  const barHeight = proportionalValue * height; // Calculate the height of the bar based on the proportional value

  console.log("maxValue");
  console.log(maxOverall);
  console.log("selectedYearValue");
  console.log(selectedYearValue);

  // Create SVG container
  let svg = d3
    .select("#stats svg")
    .append("svg")
    .attr("width", width)
    .attr("height", height + 40)
    .attr("transform", `translate(${left},${top})`);

  // Create a vertical bar
  svg
    .append("rect")
    .attr("class", name)
    .attr("x", width / 2 - 20) // X position of the bar
    .attr("y", height - barHeight) // Y position of the bar based on its height
    .attr("width", 40) // Width of the bar
    .attr("height", barHeight) // Height of the bar
    .attr("fill", "steelblue"); // Bar color, change it as needed

  svg
    .append("rect")
    .attr("x", width / 2 - 20) // X position of the bar
    .attr("y", 0) // Y position of the bar based on its height
    .attr("width", 40) // Width of the bar
    .attr("height", height)
    .attr("fill", "none")
    .attr("stroke", "black") // Contour color
    .attr("stroke-width", 2);

  svg
    .append("text")
    .attr("class", "legend")
    .text(name)
    .attr("text-anchor", "middle")
    .attr("x", width / 2)
    .attr("y", height + 20)
    .attr("fill", "black") // Fill color
    .attr("font-size", "14px");
}

function updatePIB() {
  const height = 300;
  svg = d3.select("#stats svg");
  let bar = svg.selectAll(".PIB");
  max = cts.maxValue["PIB"];
  data = cts.PIB;

  const selectedCountryData = data.find(
    (entry) => entry["Country Code"] == ctx.countryCode[ctx.statCountry]
  );
  console.log("selectedCountryData");
  console.log(selectedCountryData);

  let selectedYearValue = selectedCountryData[ctx.date];
  let proportionalValue = selectedYearValue / max;
  let barHeight = proportionalValue * height;

  bar.attr("y", height - barHeight).attr("height", barHeight);
}

function PIBBarchart(countryName, rawData, left, top, name) {
  // Filter data for the selected country name
  const selectedCountryData = rawData.find(
    (entry) => entry["Country Code"] == ctx.countryCode[ctx.statCountry]
  );

  if (!selectedCountryData) {
    console.log("No data found for the selected country.");
    return;
  }

  // Extract the years from the data excluding 'Country Name' and 'Country Code'
  const years = Object.keys(selectedCountryData).filter(
    (key) => !["Country Name", "Country Code"].includes(key)
  );

  // Define dimensions for the SVG container and bars
  const width = 500; // Specify the width of the SVG container
  const height = 150; // Specify the height of the SVG container
  const spacing = 2;
  const barWidth = (width - 50) / 23 - spacing; // Specify the width of each bar
  // Specify the spacing between bars

  // Create SVG container
  let svg = d3
    .select("#stats svg")
    .append("svg")
    .attr("width", width + 50)
    .attr("height", height + 100)
    .attr("transform", `translate(${left},${top})`);

  // Calculate the maximum value across all years for the selected country
  const maxOverall = 3000000000000;
  const yScale = d3.scaleLinear().domain([0, maxOverall]).range([height, 0]);
  const yAxis = d3.axisLeft(yScale);
  yAxis.ticks(6).tickFormat(d3.format(".2s"));
  // Create bars for each year
  years.forEach((year, index) => {
    let value = +selectedCountryData[year];
    let proportionalValue = value / maxOverall;
    let barHeight = proportionalValue * height;

    // Create individual bars
    svg
      .append("rect")
      .attr("class", `bar${index}`)
      .attr("id","indPIB")
      .attr("x", 55 + index * (barWidth + spacing)+50)
      .attr("y", height - barHeight + 25+100)
      .attr("width", barWidth)
      .attr("height", barHeight)
      .attr("fill", "steelblue");

    // Add text labels for each year
    svg
      .append("text")
      .attr("x", 55 + index * (barWidth + spacing) + barWidth / 2)
      .attr("y", height + 40)
      .attr("text-anchor", "middle")
      .text(year)
      .attr("fill", "black")
      .attr("font-size", "10px");
  });

  svg
    .append("g")
    .attr("class", "axis")
    .call(yAxis)
    .attr("transform", `translate(${50},${25})`);

  // Add legend
  svg
    .append("text")
    .attr("class", "legend")
    .text(name)
    .attr("text-anchor", "middle")
    .attr("x", width / 2)
    .attr("y", height + 65)
    .attr("fill", "black")
    .attr("font-size", "14px");
}

function updatePIBchart() {
  const height = 150;
  rawData = cts.PIB;
  maxOverall = 3000000000000;
  selectedCountryData = rawData.find(
    (entry) => entry["Country Code"] == ctx.countryCode[ctx.statCountry]
  );

  if (!selectedCountryData) {
    console.log("No data found for the selected country.");
    return;
  }

  // Extract the years from the data excluding 'Country Name' and 'Country Code'
  const years = Object.keys(selectedCountryData).filter(
    (key) => !["Country Name", "Country Code"].includes(key)
  );
  svg = d3.select("#stats svg");

  years.forEach((year, index) => {
    let value = +selectedCountryData[year];
    let proportionalValue = value / maxOverall;
    let barHeight = proportionalValue * height;

    let bar = svg.selectAll(`.bar${index}`);
    // Update individual bars
    bar.attr("y", height - barHeight + 25).attr("height", barHeight);
  });
}

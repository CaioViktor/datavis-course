var comparaGross = function(a,b){
	return a.Worldwide_Gross_M < b.Worldwide_Gross_M ? 1:-1;
}

var comparaBudget = function(a,b){
	return a.Budget_M < b.Budget_M ? 1:-1;
}

var comparaProfit = function(a,b){
	return (a.Worldwide_Gross_M - a.Budget_M) < (b.Worldwide_Gross_M - b.Budget_M)? 1:-1;
}

var comparaGrossGenre = function(a,b){
	return a.Gross_M < b.Gross_M ? 1:-1;
}

function render(dados){
	//q1
	d3.select("#q1").selectAll(".chart")
		.data(dados)
		.enter()
			.append("div")
				.attr("class","chart")
				.append("span");

	d3.select("#q1").selectAll(".chart")
		.data(dados)
			.style("width",function(d){
				return (d.Worldwide_Gross_M/5) + "px";
			})
			.select("span")
				.text(function(d){
					return d.Film +" ("+d.Worldwide_Gross_M+"M)";
				});
	d3.select("#q1").selectAll(".chart").sort(comparaGross);


	//q2
	d3.select("#q2").selectAll(".chart")
		.data(dados)
		.enter()
			.append("div")
				.attr("class","chart")
				.append("span");

	d3.select("#q2").selectAll(".chart")
		.data(dados)
			.style("width",function(d){
				return 5*d.Budget_M+"px";
			})
			.select("span")
				.text(function(d){
					return d.Film +" ("+d.Budget_M+"M)";
				});
	d3.select("#q2").selectAll(".chart").sort(comparaBudget);


	//q3
	d3.select("#q3").selectAll(".chart")
		.data(dados)
		.enter()
			.append("div")
				.attr("class","chart")
			.append("span");

	d3.select("#q3").selectAll(".chart")
		.data(dados)
			.style("width",function(d){
				return (d.Worldwide_Gross_M - d.Budget_M)+"px";
			})
			.select("span")
				.text(function(d){
					return d.Film+" ("+(d.Worldwide_Gross_M - d.Budget_M)+"M)";
				});

	d3.select("#q3").selectAll(".chart").sort(comparaProfit);

	//q4
	var genres = {};
	dados.forEach(function(e){
		var acumulated = genres[e.Genre];
		if(acumulated == undefined)
			acumulated = 0;
		acumulated = acumulated + e.Worldwide_Gross_M;
		genres[e.Genre] = acumulated;
	});
	// console.log(genres);
	var keys = Object.keys(genres);
	var listGenres = [];
	keys.forEach(function(el){
		listGenres.push({"genre":el,"Gross_M":genres[el]});
	});

	// console.log(listGenres);
	d3.select("#q4").selectAll(".chart")
		.data(listGenres)
		.enter()
			.append("div")
				.attr("class","chart")
				.append("span")

	d3.select("#q4").selectAll(".chart")
		.data(listGenres)
			.style("width",function(d){
				return (d.Gross_M/5)+"px";
			})
			.select("span")
				.text(function(d){
					return d.genre +" ("+d.Gross_M+"M)";
				});

	d3.select("#q4").selectAll(".chart").sort(comparaGrossGenre);

}

function gerar(){
	d3.json("javascript/movies.json",function(error,json){
		// console.log(json);
		render(json);
	});
}

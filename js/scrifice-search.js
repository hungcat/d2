/*!
 * scrifice-search.js
 * https://github.com/yaemon/
 *
 * Copyright r-jp, yaemon.
 * Released under the MIT license
 *
 * $Date:$
 */
const dView = {};
dView.show = function(a) {
	if ( null == a ){
		document.title = "〇〇は何の素材になるか";
		return "";
	}

	var s = "<h2>検索結果</h2>";
	var lesser = (a.rank == 0) ? 0 : a.race.list[a.rank -1].grade;

	var rList = [];
	for(let race of church.data){
		for(let comb of race.comb){
			if (a.race.type == comb.n1){
				rList.push({"second":comb.n2, "summon":race});
			} else if (a.race.type == comb.n2){
				rList.push({"second":comb.n1, "summon":race});
			}
		}
	}

	for(let r of rList){
		let x = [];
		let i = 0, j = 0, z =0;
		let second = church.getRaceByName(r.second)
		while (true) {
			if (z==0) {z = Math.floor((a.detail.grade + second.list[i].grade) / 2 ) + 1};
			if (z <= r.summon.list[j].grade) {
				x.push({"second":second.list[i], "summon":r.summon.list[j],"price":0});
				z = 0, i++;
				if (i < second.max) continue;
				break;
			}
			j++;
			if (j < r.summon.max) continue;
			break;
		}
		if (x.length > 0) {
			s += "<article><h3>" + r.second + "<br>×<br>" + r.summon.type + "</h3>";
			for (let e of x){
				s += '<ul class="rare' + e.second.rare.length + " rare";
				s += e.summon.rare.length + '"><li><span class="result-name">';
				s += e.second.name + '</span><div class="result-item"><img src="';
				s += e.second.img + '" alt=""><span class="result-rare">' + e.second.rare;
				s += '</span><span class="result-grade">Grade <span class="result-grade-num">';
				s += e.second.grade + '</span></span></div></li><li><span class="result-name">' ;
			 	s += e.summon.name + '</span><div class="result-item"><img src="';
				s += e.summon.img + '" alt=""><span class="result-rare">';
				s += e.summon.rare + '</span>';
				s += '<span class="result-grade">Grade <span class="result-grade-num">';
				s += e.summon.grade + "</span></span></div></li></ul>";
			}
			s += "</article>"
		}
	}

	document.title = a.detail.name + "は何の素材になるか";
	history.replaceState("", "", "#no" + a.detail.no);
	$("#info-ic").html('<img src="' + a.detail.img + '" alt="">');
	$("#info-name span").text(a.detail.name);
	$("#info-grade span").text(a.detail.grade);
	$("#info-type span").text(a.race.type);
	$("#info-rare span").text(a.detail.rare);
	$("#result").html(s);
	$("#info-prop li").each(function(b){$("span", this).html(a.detail.prop[b]) })

	return a.detail.name;
}

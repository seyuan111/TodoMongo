//----------------------------------------------------------
// main js for put methods
//------------------------------------------------------------

const trash = document.querySelectorAll(".trash-can");
const checkIt = document.querySelectorAll("#checkId");

Array.from(trash).forEach((can) => can.addEventListener("click", deleteItem));

//Array.from(checkIt).forEach(check => check.addEventListener('click', listener))

async function checkItem(e) {
	//console.log('Item check ', e.checked, e.parentNode.childNodes[]);
	
	const checkTxt = e.parentNode.childNodes[3].innerHTML;
	const checkIt = e.checked;
	try {
		const res = await fetch("Completed", {
			method: "put",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ JsItem: checkTxt, Jstat: checkIt }),
		})
		const data = await res.json();
		console.log(data);
		e.parentNode.childNodes[3].classList.toggle('.completed');
		location.reload();
	} catch (err) {
		console.error(err);
	}
}

async function deleteItem() {
	const txt = this.parentNode.childNodes[1].childNodes[3].innerHTML;
	console.log(txt);
	try {
		const result = await fetch("deleteItem", {
			method: "delete",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ JsItem: txt }),
		});
		const data = await result.json();
		console.log(data);
		location.reload();
	} catch (err) {
		console.error(err);
	}
}

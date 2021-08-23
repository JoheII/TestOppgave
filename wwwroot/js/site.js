// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.



function filterCategory(category) {
  // if category is selected - adjust styling and sort table //
 if (category) {

  var pathHidden = $("#transactionTable .CategoryID:not(:contains("+category+"))").parent()
  var pathSelected = $("#transactionTable .CategoryID:contains("+category+")").parent()
  
    pathHidden.addClass("hide");
    pathSelected.removeClass("hide");

    var sumIn = 0;
    var moneyIn = pathSelected.find(".moneyReceived");

    var sumOut = 0;
    var moneyOut = pathSelected.find(".moneySpent");
    
    for (var i = 0; i < moneyIn.length; i++) {
      sumIn = sumIn+parseInt(moneyIn[i].textContent)      
    }

    for (var i = 0; i < moneyOut.length; i++) {
      sumOut = sumOut+parseInt(moneyOut[i].textContent)      
    }

   $(".sumIn").text(sumIn);
   $(".sumOut").text(Math.abs(sumOut));
   $(".onLoadSum").addClass("hidden");
   $(".sumIn, .sumOut").removeClass("hidden")

 }

 // no category selected - reset table and styling //
 else {
  $("#transactionTable .CategoryID").parent().removeClass("hide");
  $(".onLoadSum").removeClass("hidden");
  $(".sumIn, .sumOut").addClass("hidden")
 }

}

// styling for dropdown-menu //
$(".dropdown-menu li").on("click", function(){
      
  var categoryName = $(this).text();

  $(this).addClass("selected").siblings().removeClass("selected")
  $(".selectedCategory").text(categoryName);

})

// Sort-asc/desc - table //

// Import Table //
const getCellValue = (tr, idx) => tr.children[idx].innerText || tr.children[idx].textContent;
const comparer = (idx, asc) => (a, b) => ((v1, v2) => 
    v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2) ? v1 - v2 : v1.toString().localeCompare(v2)
    )(getCellValue(asc ? a : b, idx), getCellValue(asc ? b : a, idx));

// Sort by selected TH-value // 
document.querySelectorAll('th').forEach(th => th.addEventListener('click', (() => {
  debugger;
  const table = th.closest('table');
  const tbody = table.querySelector('tbody');
  Array.from(tbody.querySelectorAll('tr'))
    .sort(comparer(Array.from(th.parentNode.children).indexOf(th), this.asc = !this.asc))
    .forEach(tr => tbody.appendChild(tr) );

})));
const itemsPerPage = 6;
let currentPage = 1;

const data = [
    { id: 1, orderId: "3332233223", status: "Open", sendPlace: "Qurayyat", receivePlace: "Seeb", shippedTo: "Omar" },
    { id: 2, orderId: "3332233224", status: "Pick", sendPlace: "Nizwa", receivePlace: "Sur", shippedTo: "Mohammed" },
    { id: 3, orderId: "3332233225", status: "Cancel", sendPlace: "Sohar", receivePlace: "Barka", shippedTo: "Fatima" },
    { id: 4, orderId: "3332233226", status: "Waiting", sendPlace: "Salalah", receivePlace: "Ibri", shippedTo: "Yousef" },
    { id: 5, orderId: "3332233227", status: "Delivered", sendPlace: "Rustaq", receivePlace: "Adam", shippedTo: "Sarah" },
    { id: 6, orderId: "3332233228", status: "Returned", sendPlace: "Muscat", receivePlace: "Bahla", shippedTo: "Ali" },
    { id: 7, orderId: "3332233229", status: "Delete", sendPlace: "Al Khuwair", receivePlace: "Ibra", shippedTo: "Noor" },
    { id: 8, orderId: "3332233230", status: "Open", sendPlace: "Al Buraimi", receivePlace: "Bidbid", shippedTo: "Yasmine" },
    { id: 9, orderId: "3332233231", status: "Pick", sendPlace: "Al Hamra", receivePlace: "Bidiyah", shippedTo: "Mahmoud" },
    { id: 10, orderId: "3332233232", status: "Cancel", sendPlace: "Al Suwaiq", receivePlace: "Al Rustaq", shippedTo: "Layla" }
  ];

  function renderCards(data) {
    const container = document.getElementById("cardContainer");
    container.innerHTML = "";

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, data.length); // Update endIndex

    if (data.length === 0) {
        container.innerHTML = "<p>No items found.</p>"; // Display message when no cards are found
    } else {
        const paginatedData = data.slice(startIndex, endIndex);
        
        paginatedData.forEach(item => {
            const badgeColor = getStatusBadgeColor(item.status); 
            const cardHtml = `
                <div class="col-md-6 col-xl-4 card-item">
                    <span class="card">
                        <div class="card-header border-0 pt-9">
                            <div class="card-title m-0">
                                <div class="symbol symbol-50px">
                                    <i class="ki-duotone ki-delivery" style="font-size:50px">
                                    <span class="path1"></span>
						<span class="path2"></span>
						<span class="path3"></span>
						<span class="path4"></span>
						<span class="path5"></span>
                                    </i>
                                </div>
                            </div>
                            <div class="card-toolbar">
                                <span class="badge badge-light-primary fw-bold me-auto px-4 py-3 ${badgeColor}">${item.status}</span>
                            </div>
                        </div>
                        <div class="card-body p-9">
                            <div class="fs-3 fw-bold text-dark">#${item.orderId}</div>
                            <p class="text-gray-400 fw-semibold fs-5 mt-1 mb-7">Shipped To: <span>${item.shippedTo}</span></p>
                            <div class="d-flex flex-wrap mb-5">
                                <div class="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-7 mb-3 d-flex flex-column align-items-center">
                                    <div><i class="ki-duotone ki-geolocation fs-1 text-gray-800">
                                    <span class="path1"></span>
							<span class="path2"></span></i></div>
                                    <div class="fw-semibold text-gray-400">${item.sendPlace}</div>
                                </div>
                                <div class="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 mb-3 d-flex flex-column align-items-center">
                                    <div><i class="ki-duotone ki-geolocation-home fs-1 text-gray-800">
                                    <span class="path1"></span>
							<span class="path2"></span></i></div>
                                    <div class="fw-semibold text-gray-400">${item.receivePlace}</div>
                                </div>
                            </div>
                            <div class="h-1px w-100 bg-primary rounded bg-light mb-5"></div>
                            <div class="d-flex flex-column align-items-center">
                                <a href="pages/User-Order/MyOrder.html" class="btn btn-sm btn-primary bg-hover-primary-10 text-capitalize">Select</a>
                            </div>
                        </div>
                    </span>
                </div>
            `;
            container.innerHTML += cardHtml;
        });
    }

    updatePaginationSummary(startIndex, endIndex, data.length);
}
function getStatusBadgeColor(status) {
    switch (status.toLowerCase()) {
        case "open":
            return "badge-info"; // Bootstrap class for blue badge
        case "pick":
            return "badge-warning"; // Bootstrap class for yellow badge
        case "cancel":
            return "badge-danger"; // Bootstrap class for red badge
        case "waiting":
            return "badge-secondary"; // Bootstrap class for gray badge
        case "delivered":
            return "badge-success"; // Bootstrap class for green badge
        case "returned":
            return "badge-dark"; // Bootstrap class for black badge
        case "delete":
            return "badge-light"; // Bootstrap class for light gray badge
        default:
            return "badge-primary"; // Bootstrap class for default badge color
    }
}

function updatePaginationSummary(startIndex, endIndex, totalEntries) {
    const startIndexSpan = document.querySelector(".start-index");
    const endIndexSpan = document.querySelector(".end-index");
    const totalEntriesSpan = document.querySelector(".total-entries");

    startIndexSpan.textContent = startIndex + 1;
    endIndexSpan.textContent = endIndex;
    totalEntriesSpan.textContent = totalEntries;
}

function filterData(query, status) {
    let filteredData = data.filter(item => {
        const matchesQuery = item.orderId.toLowerCase().includes(query.toLowerCase()) ||
            item.shippedTo.toLowerCase().includes(query.toLowerCase()) ||
            item.sendPlace.toLowerCase().includes(query.toLowerCase()) ||
            item.receivePlace.toLowerCase().includes(query.toLowerCase()) ||
            item.status.toLowerCase().includes(query.toLowerCase());

        if (status === "all") {
            return matchesQuery;
        } else {
            return matchesQuery && item.status.toLowerCase() === status.toLowerCase();
        }
    });

    return filteredData;
}
function updatePaginationButtonsState() {
    const prevLi = document.querySelector(".pagination .page-item:first-child");
    const nextLi = document.querySelector(".pagination .page-item:last-child");

    prevLi.classList.remove("disabled"); // Remove disabled state from "Previous" button
    nextLi.classList.remove("disabled"); // Remove disabled state from "Next" button

    if (currentPage === 1) {
        prevLi.classList.add("disabled"); // Add disabled state to "Previous" button if on first page
    } else if (currentPage === pageCount) {
        nextLi.classList.add("disabled"); // Add disabled state to "Next" button if on last page
    }
}
function paginateData(filteredData) {
    const paginationContainer = document.getElementById("pagination");
    paginationContainer.innerHTML = "";

    const pageCount = Math.ceil(filteredData.length / itemsPerPage);

    const nav = document.createElement("nav");
    const ul = document.createElement("ul");
    ul.classList.add("pagination");

    // Previous Button
    const prevLi = document.createElement("li");
    prevLi.classList.add("page-item");
    if (currentPage === 1) {
        prevLi.classList.add("disabled");
    }
   
    const prevLink = document.createElement("a");
    prevLink.classList.add("page-link");
    prevLink.textContent = "Previous";
    prevLink.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            renderCards(filteredData);
            highlightActivePage();
        }else{
            
        }
    });
    prevLi.appendChild(prevLink);
    ul.appendChild(prevLi);

    // Page Buttons
   // Page Buttons
for (let i = 1; i <= pageCount; i++) {
    const pageLi = document.createElement("li");
    pageLi.classList.add("page-item");
    const pageLink = document.createElement("a");
    pageLink.classList.add("page-link");
    pageLink.textContent = i;
    pageLink.addEventListener("click", (event) => {
        currentPage = parseInt(event.target.textContent); // Update currentPage to the clicked page
        renderCards(filteredData);
        highlightActivePage();
        updatePaginationButtonsState(); // Update button state after clicking a page link
    });
    pageLi.appendChild(pageLink);
    if (i === currentPage) {
        pageLi.classList.add("active");
    }
    ul.appendChild(pageLi);
}

// Function to update the state of "Previous" and "Next" buttons
function updatePaginationButtonsState() {
    const prevLi = document.querySelector(".pagination .page-item:first-child");
    const nextLi = document.querySelector(".pagination .page-item:last-child");

    prevLi.classList.remove("disabled"); // Remove disabled state from "Previous" button
    nextLi.classList.remove("disabled"); // Remove disabled state from "Next" button

    if (currentPage === 1) {
        prevLi.classList.add("disabled"); // Add disabled state to "Previous" button if on first page
    } else if (currentPage === pageCount) {
        nextLi.classList.add("disabled"); // Add disabled state to "Next" button if on last page
    }
}


    // Next Button
    const nextLi = document.createElement("li");
    nextLi.classList.add("page-item");
    if (currentPage  === pageCount || pageCount === 0) {
       
        nextLi.classList.add("disabled");
    }
    const nextLink = document.createElement("a");
    nextLink.classList.add("page-link");
    nextLink.textContent = "Next";
    nextLink.addEventListener("click", () => {
        if (currentPage < pageCount) {
            currentPage++;
            renderCards(filteredData);
            highlightActivePage();
        }
    });
    nextLi.appendChild(nextLink);
    ul.appendChild(nextLi);

    nav.appendChild(ul);
    paginationContainer.appendChild(nav);
}

function highlightActivePage() {
    const paginationLinks = document.querySelectorAll(".pagination .page-item");

    paginationLinks.forEach(link => {
        const pageNumber = parseInt(link.textContent);
        if (pageNumber === currentPage) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
}



function filterTable() {
    const query = document.getElementById("searchInput").value.trim();
    const status = document.querySelector("[data-kt-ecommerce-order-filter='status']").value;
    const filteredData = filterData(query, status);
    currentPage = 1;
    renderCards(filteredData);
    paginateData(filteredData);
}


document.getElementById("searchInput").addEventListener("input", (event) => {
    const query = event.target.value.trim();
    const status = document.querySelector("[data-kt-ecommerce-order-filter='status']").value;
    const filteredData = filterData(query, status);
    currentPage = 1;
    renderCards(filteredData);
    paginateData(filteredData);
});

// Initial rendering
renderCards(data);

paginateData(data);
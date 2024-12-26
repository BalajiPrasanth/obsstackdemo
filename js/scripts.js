const products = {
    "netops": {
        title: "Open Access 3 NetOps",
        description: "NetOps is a powerful tool for managing network operations efficiently."
    },
    "automation": {
        title: "Open Access Automation",
        description: "Automation provides seamless integration for automating tasks and workflows."
    },
    "aiops": {
        title: "Open Access AIOps",
        description: "AIOps leverages AI to streamline operations and ensure reliability."
    }
};

document.addEventListener("DOMContentLoaded", () => {
    const loginDropdown = document.getElementById("login-dropdown");
    const mainProducts = document.getElementById("main-products");
    const searchInput = document.getElementById("search-input");
    const resultsList = document.getElementById("results-list");

    // Toggle login request dropdown
    window.toggleLoginRequest = () => {
        loginDropdown.style.display = loginDropdown.style.display === "none" ? "block" : "none";
    };

    // Show main products section when Demo Architecture or Use Cases are clicked
    window.showProducts = (type) => {
        if (type === 'demo' || type === 'use-cases') {
            mainProducts.style.display = "block";
        }
    };

    // Redirect to demo architecture page and save image data in localStorage
    window.toggleDemoImage = () => {
        localStorage.setItem("demoImage", "assets/companylogo.jpg");
        window.location.href = "demo-architecture.html";
    };

    // Toggle content visibility for Use Cases
    window.toggleUseCaseContent = () => {
        const useCaseContent = document.getElementById('use-case-content');
        if (useCaseContent) {
            useCaseContent.style.display = useCaseContent.style.display === "none" ? "block" : "none";
        } else {
            console.error('Use Case Content element not found!');
        }
    };

    // Handle clicks on NetOps Use Cases and Solutions
    const netOpsUseCasesBtn = document.getElementById("netops-use-cases-btn");
    const netOpsSolutionsBtn = document.getElementById("netops-solutions-btn");

    if (netOpsUseCasesBtn) {
        netOpsUseCasesBtn.addEventListener("click", () => {
            const useCaseContent = document.getElementById("netops-use-case-content");
            if (useCaseContent) {
                useCaseContent.style.display = useCaseContent.style.display === "none" ? "block" : "none";
            } else {
                console.error("NetOps Use Case Content not found!");
            }
        });
    }

    if (netOpsSolutionsBtn) {
        netOpsSolutionsBtn.addEventListener("click", () => {
            const solutionsContent = document.getElementById("netops-solutions-content");
            if (solutionsContent) {
                solutionsContent.style.display = solutionsContent.style.display === "none" ? "block" : "none";
            } else {
                console.error("NetOps Solutions Content not found!");
            }
        });
    }

    // Search Functionality
    function searchProducts() {
        const query = searchInput.value.toLowerCase().trim();
        resultsList.innerHTML = "";

        if (query === "") {
            resultsList.innerHTML = "<li>Please enter a search term.</li>";
            return;
        }

        const results = Object.entries(products)
            .filter(([key, product]) =>
                product.title.toLowerCase().includes(query) ||
                product.description.toLowerCase().includes(query)
            )
            .map(([key, product]) => {
                return `
                    <li>
                        <h3>${product.title}</h3>
                        <p>${product.description}</p>
                        <button onclick="viewProduct('${key}')">View Details</button>
                    </li>
                `;
            });

        resultsList.innerHTML = results.length
            ? results.join("")
            : "<li>No products found.</li>";
    }

    // Event listener for sub-product links to store product details and redirect
    document.querySelectorAll(".sub-product-link").forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault();

            const productKey = link.getAttribute("data-product");

            switch (productKey) {
                case "netops":
                    localStorage.setItem("currentProduct", JSON.stringify(products["netops"]));
                    window.location.href = "product-details.html";
                    break;
                case "automation":
                    localStorage.setItem("currentProduct", JSON.stringify(products["automation"]));
                    window.location.href = "automation.html";
                    break;
                case "aiops":
                    localStorage.setItem("currentProduct", JSON.stringify(products["aiops"]));
                    window.location.href = "aiops.html";
                    break;
                default:
                    console.error("Unknown product key:", productKey);
            }
        });
    });

    // Function to view product details
    window.searchProducts = searchProducts;
    window.viewProduct = (key) => {
        const product = products[key];
        if (product) {
            localStorage.setItem("currentProduct", JSON.stringify(product));
            switch (key) {
                case "automation":
                    window.location.href = "automation.html";
                    break;
                case "aiops":
                    window.location.href = "aiops.html";
                    break;
                case "netops":
                    window.location.href = "product-details.html";
                    break;
                default:
                    console.error("Unknown product key:", key);
            }
        }
    };

    // On product-details page, load the product data from localStorage
    if (window.location.pathname.includes("product-details.html")) {
        const currentProduct = JSON.parse(localStorage.getItem("currentProduct"));
        if (currentProduct) {
            document.title = `${currentProduct.title} - Details`;
            document.getElementById("product-title").textContent = currentProduct.title;
            document.getElementById("product-description").textContent = currentProduct.description;
        }
    }

    // On demo-architecture page, load the image data from localStorage
    if (window.location.pathname.includes("demo-architecture.html")) {
        const demoImageSrc = localStorage.getItem("demoImage");
        if (demoImageSrc) {
            document.getElementById("demo-image").src = demoImageSrc;
        }
    }

    // Optional: Handle the search on keypress or input event
    searchInput.addEventListener('input', searchProducts);
});

function renderSites(sites, categoryName) {

  const grid =
    document.getElementById("siteGrid");

  const search =
    document.getElementById("search");


  function render(filter = "") {

    grid.innerHTML = "";


    const normalizedFilter =
      filter.trim().toLowerCase();


    const filtered =
      sites.filter(site => {

        const searchableText = (

          (site.name || "") +
          " " +
          (site.description || "") +
          " " +
          (site.tags || "")

        ).toLowerCase();


        return searchableText
          .includes(normalizedFilter);

      });


    if (filtered.length === 0) {

      grid.innerHTML = `

        <div class="empty-state">

          No ${categoryName}
          entries found.

        </div>

      `;

      return;

    }


    filtered.forEach(site => {

      const card =
        document.createElement("a");


      card.className =
        "site-card";


      card.href =
        site.url;


      card.target =
        "_blank";


      card.rel =
        "noopener noreferrer";


      card.innerHTML = `

        <h3>
          ${escapeHtml(site.name)}
        </h3>

        <p>
          ${escapeHtml(site.description || "")}
        </p>

      `;


      grid.appendChild(card);

    });

  }


  if (search) {

    search.addEventListener(
      "input",
      () => {

        render(search.value);

      }
    );

  }


  render();

}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHtml(value) {

  const div =
    document.createElement("div");

  div.textContent =
    value;

  return div.innerHTML;

}

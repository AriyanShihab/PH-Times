// display category

const loadCategory = () => {
  const url = `https://openapi.programming-hero.com/api/news/categories`;
  fetch(url)
    .then((res) => res.json())
    .then((catagoryData) => {
      const actuallData = catagoryData.data.news_category;
      console.log(actuallData);
      const categoryContainer = document.getElementById("categoryContainer");
      actuallData.forEach((catagory) => {
        const li = document.createElement("li");
        li.innerText = catagory.category_name;
        categoryContainer.appendChild(li);
        li.addEventListener("click", (e) => {
          loadDefualtData(
            `${catagory.category_id}`,
            `${catagory.category_name}`
          );
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
loadCategory();

// load defult data (using sports category)
const loadDefualtData = (catID, catName) => {
  const url = `https://openapi.programming-hero.com/api/news/category/${catID}`;
  const postCount = document.getElementById("postCount");
  fetch(url)
    .then((res) => res.json())
    .then((sporstsData) => {
      const unsortedData = sporstsData.data;
      if (unsortedData.length > 0) {
        postCount.innerText = `${unsortedData.length} post found for category ${catName}`;
      } else {
        postCount.innerText = `Ops! No Post Found found for category ${catName}`;
      }
      const originalData = Array.from(unsortedData).sort(
        (a, b) =>
          (b.total_view ? b.total_view : 0) - (a.total_view ? a.total_view : 0)
      );

      const postCardContainer = document.getElementById("postCardContainer");
      postCardContainer.innerHTML = "";
      originalData.forEach((data) => {
        const div = document.createElement("div");
        div.innerHTML = `
        <div id="postCard" class="m-4">
          <div
            class="flex flex-col md:flex-row gap-3 p-4 bg-white rounded-md shadow-2xl"
          >
            <div class="postImage" style="min-width: 20%">
              <img src="${data.thumbnail_url}" alt="" class="rounded-xl" />
            </div>
            <div class="postContent">
              <h2
                id="postTitle"
                class="font-bold text-gray-800  text-2xl"
              >
                ${data.title ? data.title : "post heading Not Found"}
              </h2>
              <p id="postSercription" class="text-gray-700 mt-4">
                ${data.details.substring(0, 300)}
              </p>
              <div
                class="postStat flex flex-wrap gat-5 justify-between items-center mt-6 px-4"
              >
                <div class="author flex gap-3">
                  <div class="authorImage">
                    <img src="${
                      data.author.img
                    }" alt="" class="w-[40px] h-[40]" style=" border-radius: 50%;" />
                  </div>
                  <div class="authorInfo">
                    <h4>${
                      data.author.name
                        ? data.author.name
                        : "No author Name Found"
                    }</h4>
                    <p>${
                      data.author.published_date
                        ? data.author.published_date
                        : "No data Found"
                    }</p>
                  </div>
                </div>
                <div class="postVeiw"> <span> ${
                  data.total_view ? data.total_view : "no post count Find"
                } </span>M</div>
                <div >
                <button onclick="loadDetails('${
                  data._id
                }')" class="px-2 py-3 rounded text-white bg-indigo-500 font-bold" >Post Details</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        `;
        postCardContainer.appendChild(div);
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const loadDetails = (postID) => {
  console.log(postID);
};

loadDefualtData("04", "Sports");

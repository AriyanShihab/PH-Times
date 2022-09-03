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
  const speen = document.getElementById("speen");
  speen.classList.remove("hidden");
  fetch(url)
    .then((res) => res.json())
    .then((sporstsData) => {
      const unsortedData = sporstsData.data;
      if (unsortedData.length > 0) {
        postCount.innerText = `${unsortedData.length} post found for category ${catName}`;
      } else {
        postCount.innerText = `Ops! No Post Found found for category ${catName}`;
        setTimeout(() => {
          if (!speen.classList.contains("hidden")) {
            speen.classList.add("hidden");
          }
        }, 1000);
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
            class="flex flex-col md:flex-row gap-3 p-4 bg-gray-800 border border-gray-50 border-opacity-20 rounded-md shadow-2xl"
          >
            <div class="postImage" style="min-width:20%">
              <img src="${data.thumbnail_url}" alt="" class="rounded-xl" />
            </div>
            <div class="postContent">
              <h2
                id="postTitle"
                class="font-bold text-gray-300  text-2xl"
              >
                ${data.title ? data.title : "post heading Not Found"}
              </h2>
              <p id="postSercription" class="text-gray-50 mt-4">
                ${data.details.substring(0, 300)}
              </p>
              <div
                class="postStat flex flex-wrap gap-2 justify-between  sm:flex-row items-center mt-6 px-4"
              >
                <div class="author flex gap-3">
                  <div class="authorImage">
                    <img src="${
                      data.author.img
                    }" alt="" class="w-[40px] h-[40]" style=" border-radius: 50%;" />
                  </div>
                  <div class="authorInfo">
                    <h4 class="text-green-500 font-bold">${
                      data.author.name
                        ? data.author.name
                        : "No author Name Found"
                    }</h4>
                    <p class="text-green-500">${
                      data.author.published_date
                        ? data.author.published_date
                        : "No data Found"
                    }</p>
                  </div>
                </div>
                <div>
                <div class="postVeiw text-green-500 md:mb-0 mb-4">Total post Veiw: <span class="font-bold text-green-500"> ${
                  data.total_view ? data.total_view : "no post count Find"
                }</span><span class="font-bold text-green-500">M</span></div>
                <div >
             
                <label onclick="loadDetails('${
                  data._id
                }')" for="my-modal" class=" modal-button px-2 py-3 rounded text-gray-700 bg-green-500 font-bold block min-w-full ">Post Details</label></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        `;
        postCardContainer.appendChild(div);
        speen.classList.add("hidden");
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
// post details modal

const loadDetails = (postID) => {
  const url = ` https://openapi.programming-hero.com/api/news/${postID}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const mainData = data.data[0];
      const modalParent = document.getElementById("modalParent");
      modalParent.innerHTML = `
      <div class="flex justify-between  px-2 py-4  border-b border-gray-700">
        <div class="aouther md:flex justify-between items-center gap-3" style="min-width:70%;">
            <img src="${
              mainData.author.img
            }" alt="" class="w-[60px] h-[60]" style=" border-radius: 50%;">
           <div>
           <h2 class="text-green-500 font-bold">${
             mainData.author.name
               ? mainData.author.name
               : "No Author Name Found"
           }</h2>
          <p class="text-green-500 font-bold"> Published Date: ${
            mainData.author.published_date
              ? mainData.author.published_date
              : "no realese date found"
          }</p></div>

        </div>

        <div class="stat mt-4 ">
        

            <p>Post Veiw: ${
              mainData.total_view ? mainData.total_view : "no data found"
            }</p>
        </div>

    </div>

      <h3 class="font-semibold text-lg my-6">${mainData.title}</h3>
        <img src="${mainData.image_url}" alt="" />
        <p class="py-4">
          ${mainData.details.substring(0, 200)}
        </p>
        
        <div class="modal-action">
          <label for="my-modal" class="btn bg-green-500 text-gray-700">Close</label>
        </div>

      `;
      console.log(mainData);
    });
};

loadDefualtData("04", "Sports");

function arg(x, y) {
  console.log(arguments); // log al the argumants
}
const arg = (x, y) => {
  console.log(arguments); // reffarence error
};

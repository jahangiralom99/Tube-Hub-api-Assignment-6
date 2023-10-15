// show categories data.
const handleCategory = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await res.json();

  const categoryContainer = document.getElementById("category-list-container");

  data.data.forEach((category) => {
    const div = document.createElement("div");
    div.innerHTML = `
        <button onclick="handleAllCategories('${category.category_id}')" class="btn btn-ghost btn-active">${category.category}</button>
        `;
    categoryContainer.appendChild(div);
  });
};

// all categories data api
const handleAllCategories = (id) => {
  fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
    .then((res) => res.json())
    .then((data) => displayAllCategories(data.data));
};

const displayAllCategories = (data) => {
  const category = document.getElementById("all-category-container");
  const error = document.getElementById("error-container");
  category.innerHTML = "";
  error.innerHTML = "";
  if (data.length > 0) {
    data.forEach((item) => {
      const timeALl = item.others.posted_date;
      // console.log(timeALl);
      const hours = Math.floor(timeALl / 3600);
      const minutes = Math.floor((timeALl - (hours * 3600)) / 60);
      const div = document.createElement("div");
      div.innerHTML = `
            <div class="card card-compact bg-base-100 shadow-xl">
            <img class="inline lg:w-[312px] md:h-[200px] rounded-lg" src="${
              item.thumbnail
            }" alt="Shoes"/>
            <div class="absolute top-52 md:top-40 right-0 ">${
              item.others.posted_date
                ? `<p class="bg-[#171717]  text-white text-center p-[4px] rounded-lg">${hours} Hours ${minutes} min ago</p>`
                : ""
            }</div>
            <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4 mt-8">
              <img
                src="${item.authors[0].profile_picture}"
                alt="Profile Image"
                class="w-16 h-16 rounded-full"
              />
              <div>
                <div class="text-gray-800">
                 <h4 class="text-xl font-semibold">${item.title} </h4>
                 <p>${item.authors[0].profile_name} ${
        item.authors[0]?.verified === true
          ? '<i class="fa-solid fa-certificate text-[#2568EF]"></i>'
          : ""
      }</p>
                 <p>${item.others.views} </p>
                </div>
              </div>
            </div>
          </div>
          </div>
            `;
      // console.log(item.others.views);
      category.appendChild(div);
    });
  } else {
    const div = document.createElement("div");
    div.innerHTML = `
            <div class="text-center">
            <img class="inline" src="images/Icon.png" alt="">
            <h5 class="text-2xl font-bold">Oops!! Sorry, There is no content here</h5>
            </div>
        `;
    error.appendChild(div);
  }
  
};

handleAllCategories("1000");
handleCategory();

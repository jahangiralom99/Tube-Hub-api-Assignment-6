// show all categories data.
const handleCategory = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await res.json();

    const categoryContainer = document.getElementById('category-list-container');

    data.data.forEach(category => {
        const div = document.createElement('div');
        div.innerHTML = `
        <button onclick="handleAllCategories(${category.category_id})" class="btn btn-active btn-ghost">${category.category}</button>
        `;
        categoryContainer.appendChild(div);
    })
}

const handleAllCategories = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data = res.json();
    console.log(data);

    const category = document.getElementById('all-category-container');

    console.log(id);
}





handleCategory()
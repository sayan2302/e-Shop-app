
const addElipsis = (str, limit) => {
    return str.length > limit ? str.substring(0, limit) + "..." : str;
};
export const getAllCategories = async () => {
    try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
        if (!response.ok) {
            throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        let categoryList = []
        data.meals.forEach(element => {
            categoryList.push(element.strCategory)
        })
        return categoryList;
    } catch (error) {
        throw new Error('Error fetching categories: ' + error.message);
    }
};
export const getAllItems = async (category) => {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
        if (!response.ok) {
            throw new Error('Failed to fetch categories');
        }
        const data = await response.json();

        return data.meals;
    } catch (error) {
        throw new Error('Error fetching categories: ' + error.message);
    }
};
export const getItemById = async (id) => {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        let list = [
            data.meals[0].idMeal,
            data.meals[0].strMeal,
            data.meals[0].strCategory,
            data.meals[0].strMealThumb,
            addElipsis(data.meals[0].strInstructions, 1100)
        ]

        return list
    } catch (error) {
        throw new Error('Error fetching categories: ' + error.message);
    }
};

export const getCartItems = async (idCount) => {
    let list = []
    // const { cart, setCart } = useContext(AppContext)
    idCount.forEach(async (obj) => {

        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${obj.id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch categories');
            }
            const data = await response.json();


            list.push({
                id: String(data.meals[0].idMeal),
                name: String(data.meals[0].strMeal),
                image: data.meals[0].strMealThumb,
                count: obj.count
            })
        } catch (error) {
            throw new Error('Error fetching categories: ' + error.message);
        }

        // console.log(list)
    })
    // setCart(list)
    return list
};


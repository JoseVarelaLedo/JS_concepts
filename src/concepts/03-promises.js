import { heroes} from '../data/heroes';
/**
 * 
 * @param {HTMLDivElement} element 
 */
export const promiseComponent = (element) => {
    const renderHero = (hero) => {
        element.innerHTML = hero.name;
    };

    const renderHeroes = (hero1, hero2) =>{
        element.innerHTML = `
            <h1>Heroes</h1>
            <h3>${hero1.name}</h3>
            <h3>${hero2.name}</h3>
        `;
    };

    const renderError = (error) => {
        element.innerHTML = `<h1>Error</h1><h3>${error}</h3>`;
    };

    const id1 = '5d86371f2343e37870b91ef1';
    const id2 = '5d86371f9f80b591f499df32';
    
    let hero1;

    //!forma 3 y definitiva -> Promise.All

    Promise.all ([
        findHero (id1),
        findHero (id2)
     //]).then (([hero1, hero2]) => renderHeroes (hero1, hero2))
    ]).then ((arrayHeroes) => renderHeroes (arrayHeroes[0], arrayHeroes[1]))
    //]).then ((arrayHeroes) => arrayHeroes.forEach (heroe => renderHero(heroe)))
    .catch (renderError);


        //!forma2
    // findHero (id1)
    //     .then (hero =>{
    //         hero1= hero;
    //         return findHero (id2);
    //     }).then (hero2 => {
    //         renderHeroes (hero1, hero2);
    //     })
    //     .catch (renderError);

        //!forma 1
    // findHero (id1)
    //     .then ( (hero1)=> {           
    //         findHero (id2)
    //             .then (hero2=>{
    //                 renderHeroes (hero1, hero2);                
    //             })
    //             .catch (renderError);
    //     })
    //     .catch (renderError)
    //     ;
};

/**
 * 
 * @param {String} id 
 * @returns {Promise<Object>} //se puede omitir el Object, equivale a any. Si fuese de algún tipo especial, mejor ponerlo
 */
const findHero = (id) => {
   return new Promise((resolve, reject) =>{
        const hero = heroes.find (hero => hero.id === id);
        if (hero){
            resolve (hero);
            return;
        } 

        reject(`Hero with id ${id} not found`);
    });    
};
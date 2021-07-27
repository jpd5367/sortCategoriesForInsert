  /**
   * Recursive function to sort parent-child dependent objects starting with the root.
   * @param {*} roots Objects which are the root of the iteration.
   * @param {*} data Objects which have a parent in roots.
   * @returns 
   */
  function sortCategories(roots, data){
        let rootKeys = roots.map(x=>x.id);
        let nextRoots = data.filter(x=>rootKeys.includes(x.parent_id));
        let nextData = data.filter(x=>!rootKeys.includes(x.parent_id));
        if(nextData.length > 0){
            console.log('nextRoots, nextData', {nextRoots, nextData});
            return nextRoots.concat(sortCategories(nextRoots, nextData));
        }
        return nextRoots;
  }
  
  /**
   * Sorts a JSON Array by order of parent to childen roots having no parents
   * @param {*} inputJson Valid unsorted stringified JSON array. 
   * @returns Valid sorted stringified JSON array.
   */
  module.exports = function sortCategoriesForInsert (inputJson) {
     
    let input = JSON.parse(inputJson);
    let roots = input.filter(x=>x.parent_id === null);
    let data = input.filter(x=>x.parent_id !== null);
    let properJsonOutput = JSON.stringify(roots.concat(sortCategories(roots, data)));
    return properJsonOutput
  }
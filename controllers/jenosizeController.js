exports.game24 = async (req, res, next) => {
  try {
    const { numbers } = req.body;

    function solve24Game(nums) {
      // Check if all numbers are valid (1-9).
      for (let num of nums) {
        if (num <= 0 || num > 9) {
          return false;
        }
      }

      // Generate all possible combinations of operations.
      let possibilities = generateCombos(nums);

      // Run through all possibilities, return true if any produce 24.
      for (let poss of possibilities) {
        let slicePoss = poss.slice(0,-1)
        function generateExpressionCombinations(expression) {
          const combinations = [];
        
          // Recursive helper function
          function generateCombinationsHelper(expr, index) {
            // Base case: If we reach the end of the expression, add it to the combinations
            if (index === expr.length) {
              combinations.push(expr);
              return;
            }
        
            // Check if we can add parentheses at the current index
            if ((index === 1 || index === 3) && (expr[index] === '+' || expr[index] === '-') && (expr[index + 2] === '+' || expr[index + 2] === '-')) {
              // Generate combinations by adding parentheses around the subexpression
              const subExpression = expr.slice(index - 1, index + 4);
              const combination = expr.slice(0, index - 1) + '(' + subExpression + ')' + expr.slice(index + 4);
              generateCombinationsHelper(combination, index + 5);
            }
        
            // Recursively move to the next index
            generateCombinationsHelper(expr, index + 1);
          }
        
          // Start the recursive generation
          generateCombinationsHelper(expression, 0);
        
          return combinations;
        }
        
        let sliceWithExpressionPoss = generateExpressionCombinations(slicePoss)
        console.log("sliceWithExpressionPoss",sliceWithExpressionPoss);
        
        for(let curposs of sliceWithExpressionPoss )
        if (eval(curposs) === 24) {
          return true;
        }
      }

      // No combinations worked, return false.
      return false;

      function generateCombos(numbers) {
        // Initialize possibilities array.
        let result = [];

        // Iterate for each number in the input array.
        for (let index = 0; index < numbers.length; index++) {
          let newCombo = [];

          let currentValue = numbers[index];

          // If a single number, just push.
          if (numbers.length === 1) {
            newCombo.push(numbers[index]);
          } else {
            let remainingNumbers = numbers
              .slice(0, index)
              .concat(numbers.slice(index + 1));

            // Recursively generate combinations of remaining values.
            let recursiveResult = generateCombos(remainingNumbers);

            // Iterate through recursive result and expand with currentValue.
            for (let combo of recursiveResult) {
              newCombo.push([combo, currentValue].join(""));
            }
          }

          // Iterate through all operating symbols and push to result.
          for (let symbol of ["+", "-", "*", "/"]) {
            for (let combo of newCombo) {
                result.push([combo, symbol].join(""));
            }
          }
        }
        return result;
      }
    }

    let result = solve24Game(numbers);

    res.json({ result });
  } catch (err) {
    next(err);
  }
};

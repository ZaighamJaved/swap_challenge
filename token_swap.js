
/**
 Problem:

		You are given a list of token pairs and their exchange rates in the following format:

		TokenA, TokenB, 1.2
		TokenB, TokenC, 0.003

		This indicates that 1 unit of TokenA can be swapped for 1.2 units of TokenB, and 1 unit of TokenB can be swapped for 0.003 units of TokenC.

		You will be given a number of queries, where each query will be in the format of:

		TokenA, TokenC, 10000

		This indicates that the user wants to swap 10000 units of TokenA to TokenC.

		You need to write a program that will return the maximum number of tokens received at the end of the swap.

		Input:

		The first line of input will contain a single integer n (1 <= n <= 10^5) indicating the number of token pairs.
		The next n lines will contain the token pairs in the format of TokenA, TokenB, rate, where rate is the exchange rate of TokenA to TokenB.
		The next line will contain a single integer q (1 <= q <= 10^5) indicating the number of queries.
		The next q lines will contain the queries in the format of TokenA, TokenC, amount, where amount is the number of units of TokenA that should be swapped to TokenC.
		Output:

		For each query, output a single line containing the maximum number of tokens that can be received.
		Example:
		Input:
		2
		TokenA, TokenB, 1.2
		TokenB, TokenC, 0.003
		2
		TokenA, TokenC, 10000
		TokenB, TokenA, 10000

		Output:
		36
		8333.333333

		Note:

		The precision of the output should be 6 decimal places.
		The tokens and rates are given for example, the actual token names and rates can be different.
 */


const lineByLine = require('n-readlines') // third pary library to read the input from file line by line
const liner = new lineByLine('./input.txt')

//TODO: this solution can be improved if we have multiple pairs with different price to get swap for two tokens
function calculateTokenExchange() {
	const pairsWithRate = {} // DS with all pair prices
	const numOfPairs = +liner.next().toString() // total number pairs
	for (let i = 0; i < numOfPairs; i++) {
		const [tokenA, tokenB, rate] = liner.next().toString().split(', ').map(token => typeof token === 'string' ? token.trim() : parseFloat(token))
		if (!pairsWithRate[tokenA]) pairsWithRate[tokenA] = {}
		pairsWithRate[tokenA][tokenB] = parseFloat(rate)
		if (!pairsWithRate[tokenB]) pairsWithRate[tokenB] = {}
		pairsWithRate[tokenB][tokenA] = 1 / parseFloat(rate)
	}

	const results = []
	const numOfQueries = +liner.next().toString()
	for (let i = 0; i < numOfQueries; i++) {
		const [tokenA, tokenB, amount] = liner.next().toString().split(", ").map((token) => typeof token === 'string' ? token.trim() : parseFloat(token))
		// verification of token pair existance
		if (!pairsWithRate[tokenA] || !pairsWithRate[tokenB]) {
			results.push("undefined")
			continue
		}

		const queue = [{ token: tokenA, amount: parseFloat(amount) }]
		const visited = new Set()

		while (queue.length > 0) {
			const { token, amount } = queue.shift()
			visited.add(token)

			if (token === tokenB) {
				results.push(+amount.toFixed(6))
				console.log(+amount.toFixed(6))
				break
			}

			for (const [nextToken, rate] of Object.entries(pairsWithRate[token])) {
				if (!visited.has(nextToken)) {
					queue.push({ token: nextToken, amount: amount * rate })
				}
			}
		}
	}

	return results
}

calculateTokenExchange()
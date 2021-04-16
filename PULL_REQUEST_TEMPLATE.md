## Goal of the pull request:
* [ ] Documentation
* [x] Bugfix
* [ ] Feature (New!)
* [x] Enhancement


## Description
<!--- What are the changes? -->

added the ability so search by epid in function 'searchItems'. It was stated in the repo's docs but there was no real way to do it using the auth flow. 

marked both bugfix and enhancement because it's not a proper bug, but it's not an enhancement either since it was stated in the docs that 'searchItems' could search by ePID.

Details:
just two lines in 'src/buy-api.js'

+ 52 

if (!searchConfig.keyword && !searchConfig.categoryId && !searchConfig.gtin && !searchConfig.epid) throw new Error('Error --> Keyword or category id is required in query param');

+ 61

queryParam = queryParam + (searchConfig.epid ? '&epid=' + searchConfig.epid : '');


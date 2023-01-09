![ts](https://badgen.net/badge/-/TypeScript?icon=typescript&label&labelColor=blue&color=555555)  ![Test](https://github.com/dawnimpulse/error-key/actions/workflows/ci.yml/badge.svg) [![codecov](https://codecov.io/gh/dawnimpulse/error-key/branch/master/graphs/badge.svg)](https://codecov.io/gh/DawnImpulse/error-key) ![npm](https://img.shields.io/npm/v/error-key) ![npsr](https://img.shields.io/npm/dt/error-key.svg) [![install size](https://packagephobia.com/badge?p=error-key)](https://packagephobia.com/result?p=error-key) [![Buy us a tree](https://img.shields.io/badge/Treeware-%F0%9F%8C%B3-lightgreen)](https://plant.treeware.earth/dawnimpulse/error-key) [![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-blue.svg)](https://conventionalcommits.org) ![License: Unlicense](https://img.shields.io/badge/license-Unlicense-brightgreen.svg)

### About
> This is a completely free public domain software, read more in the end
- **error-key** is use to simplify your project errors & give them unique numbers for easy identification. Quite helpful in case of rest apis where you wish to convey what caused the error & also able to track down the error/bug internally.
- for **APIs** specifically you can also easily fetch `statusCode` to return from your error code ; no more guessing / writing deep logic for exact `statusCode` to send

### Quick Code
* define an object with the following format (learn about the [format  below](#Working))
```
const errorObj = {
	404 : {
		"userNotFound": "userNotFound",
		"orgNotFound": "orgNotFound"
	},
	500 : {
		"unknown: "unknown"
	}
}
```
* next initialize in start of your project
```
const errorKey = require("error-key");

errorKey.initErrors([], errorObj) // initializing
errorKey.keys() // will return object of unique keys with unique codes
errorKey.map() // return object similar to config file with unique code mapping
```

```
// you can simply get unique error code anywhere
try{
	// ....
}catch(err){
	const uniqueCode = errorKey.keys().invalidKey;
	// uniqueCode is a number eg: 4001011 or 5021012
	// read more detail about them below
}
```

### Working
You start by creating a unique configuration object anywhere in your project which you can pass to the `initErrors` object.

- The config file is quite simple to understand. The first nesting is your `statusCode` keys & in each key the error that you wish to declare with both `key` & `value` name similar.
- All common status codes ***(for errors)*** are covered between **400 - 600** although if you wish to use some *other error code* you have to pass it inside `initErrors` function (see [below](#Initialization))
- You can only provide status codes you need and skip the others

> **Note:** The above example (in quick code) is the way your config object should be structured. You will receive an error while initializing if incorrect format is provided.

### Initialization
Simply initialize this anywhere in your project (ofcourse recommended way is in the very start itself)

- `initErrors(codes, config)`
    - ***codes***  : array of `numbers` - if you wish to provide custom `statusCodes` (provide `[]` if no custom codes)
        - example:  `init([888,999], errorObj)`
    - ***config***: your configuration object (learn about config object above)
        - example: `init([], errorObj)`

### Contact
Twitter - [@dawnimpulse](https://twitter.com/dawnimpulse)  
Email - [dawnimpulse@gmail.com](mailto://dawnimpulse@gmail.com)

### Treeware
This package is [Treeware](https://treeware.earth). If you use it in production, then we ask that you [**buy the world a tree**](https://plant.treeware.earth/dawnimpulse/error-key) to thank us for our work. By contributing to the Treeware forest you’ll be creating employment for local families and restoring wildlife habitats.


### The Unlicense
~~~~
error-key is free and unencumbered public domain software. 

For more information, see http://unlicense.org/ or the accompanying UNLICENSE file. 
~~~~
> Written with [StackEdit](https://stackedit.io/).
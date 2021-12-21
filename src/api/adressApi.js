export function getAddress(text){

	const url = `https://geo.api.gouv.fr/communes?nom=${text}&limitParam='15'`;
	return fetch(url)
    .then(res => res.json())
    .catch((error) => console.log(error));
}
  
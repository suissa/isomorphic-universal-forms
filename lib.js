const data = [
  { name: 'name', element: 'input', type: 'text' },
  { name: 'password', element: 'input', type: 'password' },
  { name: 'email', element: 'input', type: 'email' },
  { name: 'descrição', element: 'input', type: 'textarea' },
  {
    name: 'Selecione uma opção',
    element: 'input',
    type: 'select',
    source: [
      { name: 'option1', id: 1 },
      { name: 'option2', id: 2 },
      { name: 'option3', id: 3 },
    ],
  },
  { name: 'name', element: 'input', type: 'number', max: 100 },
];

const comboPopulate = ( data, map ) => 
  data.reduce(( acc, el ) => acc += `<option value="${ el[ map.value ] }">${ el[ map.name ] }</option>`, "")

const bootstrapStyle = ( el ) => {
    
    const input    = () => `<div class="form-group">
                                <label for="exampleInputEmail1">${ el.name }</label>
                                <input type="${ el.type }" class="form-control" id="" aria-describedby="emailHelp" placeholder="${ el.name }">
                                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>`

    const number   = () => `<div class="form-group">
                                <label for="exampleInputEmail1">${ el.name }</label>
                                <input type="${ el.type }" class="form-control" id="" aria-describedby="emailHelp" placeholder="${ el.name }" min="${ el.min ? el.min : 0 }" max="${ el.max ? el.max : 0 }" >
                                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>`

    const textarea = () => `<div class="form-group">
                                <label for="exampleFormControlTextarea1">${ el.name }</label>
                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                            </div>`

    const select   = () => `<div class="form-group">
                                <label for="exampleFormControlSelect1">Example select</label>
                                <select class="form-control" id="exampleFormControlSelect1">
                                ${ comboPopulate( el.source, { value: "id", name: "name" } ) }
                                </select>
                           </div>`

    const types = {
        text: input,
        password: input,
        email: input,
        textarea,
        select,
        number
    }

    return ( types[ el.type ] || types[ "text" ])()
}


const defaultStyle = ( el ) => {
    
    const input    = () =>   `<input type="${ el.type }" placeholder="${ el.name }">`
    const textarea = () =>   `<textarea rows="3"></textarea>`
    const select   = () =>   `<select>${ comboPopulate( el.source, { value: "id", name: "name" } ) }</select>`
    const number   = () =>   `<input type="${ el.type }" placeholder="${ el.name }" min="${ el.min ? el.min : 0 }" max="${ el.max ? el.max : 0 }">`

    const types = {
        text: input,
        password: input,
        email: input,
        textarea,
        select,
        number
    }

    return (types[el.type] || types["text"])()
}

const wrapper = ( el, wrapper ) => ({
    
    defaultStyle: defaultStyle( el ),
    bootstrapStyle: bootstrapStyle( el )

}[ wrapper ])
    
const makeElemets = ( data, style ) => data.reduce(( acc, el ) => acc += `${ wrapper( el, style ) }\n`,"")
        
const getTemplate = ( data, type ) => `<form>\n${ makeElemets( data, type ) }</form>`

const makeForm = ( data = {}, template = 'defaultStyle' ) => getTemplate( data, template )

console.log( makeForm( data ) )
console.log( makeForm( data, "bootstrapStyle" ) )







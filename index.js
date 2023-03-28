const character = newImage('Assets/pacright.png')


function handleDirectionChange(direction){
    if(direction === null){
        character.src = ''
    }
    if(direction === 'west'){
        character.src = ''
    }
    if(direction === 'north'){
        character.src = ''
    }
    if(direction === 'east'){
        character.src = ''
    }
    if(direction === 'south'){
        character.src = ''
    }
}

move(character).withArrowKeys(100, 250, handleDirectionChange)

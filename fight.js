const canvas=document.querySelector('canvas');
const c=canvas.getContext('2d');

canvas.width=1244;
canvas.height= 700;
c.fillRect(0,0,1244,700);
const gravity=4
class Sprite{
    constructor({ position,imagesrc,scale=1,framesmax=1,offset={x:0,y:0}}){
        this.position=position
        this.scale=scale
        this.height=150
        this.width=50
        this.image= new Image()
        this.image.src=imagesrc
        this.framesmax=framesmax
        this.framescurrent=framesmax-1
        this.frameselapsed=0
        this.frameshold=5
        this.offset=offset
        
    }
    draw(){
        c.drawImage(this.image,
            this.framescurrent*this.image.width/this.framesmax,
            0,
            this.image.width/this.framesmax,
            this.image.height,
            this.position.x-this.offset.x,
            this.position.y-this.offset.y,
            (this.image.width/this.framesmax)*this.scale,
            this.image.height*this.scale)
      }

    animateframes(){
        this.frameselapsed++
        if(this.frameselapsed%this.frameshold===0){
            if(this.framescurrent<this.framesmax-1){
                this.framescurrent++
            }else{
                this.framescurrent=0
            }
        }
    }
    update(){
        this.draw()
        this.animateframes()
        
    }
    


}
class fighter extends Sprite{
    constructor({ position,
        velocity,
        color='red',
        offset={x:0,y:0},
        imagesrc,
        framesmax=1,
        scale=1,
        sprites,
        attackbox=
        {offset:{},width:undefined,height:undefined},
    }){
        super({position,
            imagesrc,
            framesmax,
            offset,
            scale
        })
        this.position=position
        this.velocity=velocity
        this.height=150
        this.width=50
        this.lastkey
        this.dirkey
        this.time
        this.leftdead=false
        
        this.color=color
        this.attackbox={
            position:{
                x:this.position.x,
                y:this.position.y
            },
            offset:attackbox.offset,
            height:attackbox.height,
            width:attackbox.width
        },
        this.isattacking
        this.health=100
        this.framescurrent=0
        this.frameselapsed=0
        this.frameshold=5
        this.sprites=sprites
        for(const sprite in this.sprites){
            sprites[sprite].image=new Image()
            sprites[sprite].image.src=sprites[sprite].imagesrc
        }
        this.dead=false
        this.powerattack=false
   
    }
    
    
    update(){
        this.draw()
        if(!this.dead && !this.leftdead)
            this.animateframes()
        this.attackbox.position.x=this.position.x+this.attackbox.offset.x
        this.attackbox.position.y=this.position.y+this.attackbox.offset.y
    
        
        this.position.y+=this.velocity.y
        this.position.x+=this.velocity.x
        if(this.position.y+this.height>=583){
            this.velocity.y=0
        }
        else{
            this.position.y+=gravity
        }
    }
    attack(){
        this.isattacking=true
        if(this.dirkey==='a'|| this.dirkey==='right'){
            if(this.dirkey==='a'&& this.attackbox.offset.x>0){
                this.attackbox.offset.x-=280
            }else if(this.dirkey==='right'&&this.attackbox.offset.x<0){
                this.attackbox.offset.x+=240
            }
            this.switchsprite('leftattack1')
        }else{
            if(this.dirkey==='d'&& this.attackbox.offset.x<0){
                this.attackbox.offset.x+=280
            }else if(this.dirkey==='left'&&this.attackbox.offset.x>0){
                this.attackbox.offset.x-=240
            }
        
        this.switchsprite('attack1')
        }
    }
    takeHit(){
        this.health-=10
        if(this.health<=0){
            if(this.dirkey==='a'||this.dirkey==='right'){
                this.switchsprite('leftdead')
            }else{
            this.switchsprite('dead')
        }
    }else{
            if(this.dirkey==='a'||this.dirkey==='right'){
                this.switchsprite('lefthit')
            }else{
            
            this.switchsprite('takehit')
        }
    }

    }
    attackpow(){
        if(timer<30){    
        this.powerattack=true
        if(this.dirkey==='a'|| this.dirkey==='right'){
            if(this.dirkey==='a'&& this.attackbox.offset.x>0){
                this.attackbox.offset.x-=320
            }else if(this.dirkey==='right'&&this.attackbox.offset.x<0){
                this.attackbox.offset.x+=290
            }
            this.switchsprite('leftattack2')
        }else{
            if(this.dirkey==='d'&& this.attackbox.offset.x<0){
                this.attackbox.offset.x+=320
            }else if(this.dirkey==='left'&&this.attackbox.offset.x>0){
                this.attackbox.offset.x-=290
            }
        this.switchsprite('attack2')
        }
    }else{
             this.powerattack=false 
        }
        

    }
    powerhit(){
        this.health-=20
        if(this.health<=0){
            if(this.dirkey==='a'||this.dirkey==='right'){
                this.switchsprite('leftdead')
            }else{
           
            this.switchsprite('dead')
        }
    }else{
            if(this.dirkey==='a'||this.dirkey==='right'){
                this.switchsprite('lefthit')
            }else{
            this.switchsprite('takehit')
        }
    }
    }
    switchsprite(sprite){
        if(this.image===this.sprites.attack1.image && this.framescurrent<this.sprites.attack1.framesmax-1){ return}
        if(this.image===this.sprites.takehit.image && this.framescurrent<this.sprites.takehit.framesmax-1){return}
        if(this.image===this.sprites.death.image){
            if (this.framescurrent===this.sprites.death.framesmax-1)
                this.dead=true
             
            return}
            if(this.image===this.sprites.leftdead.image){
                if (this.framescurrent===this.sprites.leftdead.framesmax-1)
                    this.leftdead=true
                 
                return}
    

        if(this.image===this.sprites.attack2.image && this.framescurrent<this.sprites.attack2.framesmax-1){return}
        if(this.image===this.sprites.leftattack1.image && this.framescurrent<this.sprites.leftattack1.framesmax-1){ return}
        if(this.image===this.sprites.leftattack2.image && this.framescurrent<this.sprites.leftattack2.framesmax-1){ return}
        if(this.image===this.sprites.lefthit.image && this.framescurrent<this.sprites.lefthit.framesmax-1){return}
        switch(sprite){
            
            case 'idle':
                if(this.image!==this.sprites.idle.image){
                    this.image=this.sprites.idle.image
                    this.framesmax=this.sprites.idle.framesmax
                    this.framescurrent=0
                
                }
                break
            case 'run':
                if(this.image!==this.sprites.run.image){
                    this.image=this.sprites.run.image
                    this.framesmax=this.sprites.run.framesmax
                    this.framescurrent=0
                    
                }
                break
            case 'jump':
            if(this.image!==this.sprites.jump.image){
                this.image=this.sprites.jump.image
                this.framesmax=this.sprites.jump.framesmax
                this.framescurrent=0
                
            }
            break
            case 'fall':
                if(this.image!==this.sprites.fall.image){
                this.image=this.sprites.fall.image
                this.framesmax=this.sprites.fall.framesmax
                this.framescurrent=0
        
            }
            break
            case 'attack1':
                if(this.image!==this.sprites.attack1.image){
                this.image=this.sprites.attack1.image
                this.framesmax=this.sprites.attack1.framesmax
                this.framescurrent=0
                
            }
            break
            case 'takehit':
                if(this.image!==this.sprites.takehit.image){
                this.image=this.sprites.takehit.image
                this.framesmax=this.sprites.takehit.framesmax
                this.framescurrent=0
            
            }
            break
            
            case 'dead':
                if(this.image!==this.sprites.death.image){
                this.image=this.sprites.death.image
                this.framesmax=this.sprites.death.framesmax
                this.framescurrent=0
            
            }
            break
            case 'attack2':
                if(this.image!==this.sprites.attack2.image){
                this.image=this.sprites.attack2.image
                this.framesmax=this.sprites.attack2.framesmax
                this.framescurrent=0
            
            }
            break
            case 'back':
                if(this.image!==this.sprites.back.image){
                this.image=this.sprites.back.image
                this.framesmax=this.sprites.back.framesmax
                this.framescurrent=0
            
            }
            break
            case 'leftidle':
                if(this.image!==this.sprites.leftidle.image){
                this.image=this.sprites.leftidle.image
                this.framesmax=this.sprites.leftidle.framesmax
                this.framescurrent=0
            
            }
            break
            case 'leftjump':
                if(this.image!==this.sprites.leftjump.image){
                this.image=this.sprites.leftjump.image
                this.framesmax=this.sprites.leftjump.framesmax
                this.framescurrent=0
            
            }
            break
            case 'leftfall':
                if(this.image!==this.sprites.leftfall.image){
                this.image=this.sprites.leftfall.image
                this.framesmax=this.sprites.leftfall.framesmax
                this.framescurrent=0
            
            }
            break
            case 'leftattack1':
                if(this.image!==this.sprites.leftattack1.image){
                this.image=this.sprites.leftattack1.image
                this.framesmax=this.sprites.leftattack1.framesmax
                this.framescurrent=0
            
            }
            break
            case 'leftattack2':
                if(this.image!==this.sprites.leftattack2.image){
                this.image=this.sprites.leftattack2.image
                this.framesmax=this.sprites.leftattack2.framesmax
                this.framescurrent=0
            
            }
            break
            case 'lefthit':
                if(this.image!==this.sprites.lefthit.image){
                this.image=this.sprites.lefthit.image
                this.framesmax=this.sprites.lefthit.framesmax
                this.framescurrent=0
            
            }
            break
            case 'leftdead':
                if(this.image!==this.sprites.leftdead.image){
                this.image=this.sprites.leftdead.image
                this.framesmax=this.sprites.leftdead.framesmax
                this.framescurrent=0
            
            }
            break
        

        
        }

    }


}
const background=new Sprite({
    position:{
        x:0,
        y:0
    },
    imagesrc:"background.png"
})
const shop=new Sprite({
    position:{
        x:760,
        y:230
    },
    imagesrc:"shop.png",
    scale:2.75,
    framesmax:6
})
 
const player=new fighter({
    position: {
        x:50,
        y:100
    },
     velocity:{
        x:0,
        y:0
    },
    offset:{
        x:220,
        y:155
    },
    imagesrc:"Idle.png",
    framesmax:8,
    scale:2.5,
    
    sprites:{
        idle:{
            imagesrc:"Idle.png",
            framesmax:8
        },
        run:{
            imagesrc:"Run.png",
            framesmax:8
        },
        jump:{
            imagesrc:"Jump.png",
            framesmax:2
        },
        fall:{
            imagesrc:"Fall.png",
            framesmax:2
        },
        attack1:{
            imagesrc:"Attack1.png",
            framesmax:6
        },
        takehit:{
            imagesrc:"ptakehit.png",
            framesmax:4
        },
        death:{
            imagesrc:"dead.png",
            framesmax:6
    },
    attack2:{
        imagesrc:"Attack2.png",
        framesmax:6
    },
    back:{
        imagesrc:"back.png",
        framesmax:8
    },
    leftidle:{
        imagesrc:"leftidle.png",
        framesmax:8
    },
    leftjump:{
        imagesrc:"ljump.png",
        framesmax:2
    },
    leftfall:{
        imagesrc:"lfall.png",
        framesmax:2
    },
    leftattack1:{
        imagesrc:"leftattack.png",
        framesmax:6
    },
    leftattack2:{
        imagesrc:"leftattack2.png",
        framesmax:6
    },
    lefthit:{
        imagesrc:"pltakehit.png",
        framesmax:4
    },
    leftdead:{
        imagesrc:"death4.png",
        framesmax:1

    }
    },
    attackbox:{
        offset:{
            x:90,
            y:32
        },
        height:60,
        width:160
    }
    
})
const enemy=new fighter({
    position: {
        x:1100,
        y:100
    },
     velocity:{
        x:0,
        y:0
    },
    color:'blue',
    offset:{
        x:220,
        y:170
    },
    imagesrc:"pidle.png",
    framesmax:4,
    scale:2.5,
    sprites:{
        idle:{
            imagesrc:"pidle.png",
            framesmax:4
        },
        run:{
            imagesrc:"prun.png",
            framesmax:8
        },
        jump:{
            imagesrc:"pjump.png",
            framesmax:2
        },
        fall:{
            imagesrc:"pfall.png",
            framesmax:2
        },
        attack1:{
            imagesrc:"pattack.png",
            framesmax:4
        },
        takehit:{
            imagesrc:"hit.png",
            framesmax:3
        },
        death:{
            imagesrc:"enemydead.png",
            framesmax:7
        },
        attack2:{
            imagesrc:"pattack2.png",
            framesmax:4
        },
        back:{
            imagesrc:"pback.png",
            framesmax:8
        },
        leftidle:{
            imagesrc:"plidle.png",
            framesmax:4
        },
        leftjump:{
            imagesrc:"pljump.png",
            framesmax:2
        },
        leftfall:{
            imagesrc:"plfall.png",
            framesmax:2
        },
        leftattack1:{
            imagesrc:"plattack.png",
            framesmax:4
        },
        leftattack2:{
            imagesrc:"plattack2.png",
            framesmax:4
        },
        lefthit:{
            imagesrc:"plhit.png",
            framesmax:3
        },
        leftdead:{
            imagesrc:"leftdead.png",
            framesmax:7
    
        }
    },
    attackbox:{
        offset:{
            x:-177,
            y:38
        },
        height:60,
        width:160
    }
    
    
})
const keys={
    a:{
        pressed:true
    },
    d:{
        pressed:true
    },
    left:{
        pressed:true
    },
    right:{
        pressed:true
    }

}
function winner({player,enemy,timeid}){
    clearTimeout(timeid)
    document.querySelector('#win').style.display='flex'
    if(enemy.health==player.health){
        document.querySelector('#win').innerHTML='match tied'

    }
    else if(enemy.health>player.health){
        document.querySelector('#win').innerHTML='player 2 wins'
    }   
    else if(enemy.health<player.health){
        document.querySelector('#win').innerHTML='player 1 wins'
       
    }
}






let timer=50
let timeid
function time(){
        if(timer>0){
        timeid=setTimeout(time,1000)

        timer--
        document.querySelector('#time').innerHTML=timer
       }    
    else{
        winner({player,enemy})
    }

}

time()


function collision({player1,player2}){
    return(
        player1.attackbox.position.x+player1.attackbox.width>=player2.position.x &&
        player1.attackbox.position.x<=player2.position.x+player2.width &&
        player1.attackbox.position.y+player1.attackbox.height>=player2.position.y &&
        player1.attackbox.position.y<=player2.position.y+player2.height
    )
}

function playeratack(){
    enemy.health
}

function animate(){
    
    window.requestAnimationFrame(animate)
    c.fillStyle='black'
    c.fillRect(0,0,canvas.width,canvas.height)
    background.update()
    shop.update()
    c.fillStyle='rgba(255,255,255,0.1)'
    c.fillRect(0,0,canvas.width,canvas.height,0.1)
    player.update()
    enemy.update()

    player.velocity.x=0
    
    enemy.velocity.x=0

    if (keys.a.pressed && player.lastkey==='a' && player.position.x>5){
        player.velocity.x=-5
        player.switchsprite('back')
    
    }
    else if(keys.d.pressed && player.lastkey==='d' && player.position.x<1190){
        player.velocity.x=5
        player.switchsprite('run')

    }else{
        if(player.dirkey==='a'){
            player.switchsprite('leftidle')
        }else{
            player.switchsprite('idle')
        }

    }
    if (player.velocity.y<0 ){
       if(player.dirkey==='a'){
           player.switchsprite('leftjump')
       }else{        
        player.switchsprite('jump')
       }
    }else if(player.velocity.y>0){
        if(player.dirkey==='a'){
            player.switchsprite('leftfall')
        }else{
        player.switchsprite('fall')
        }
    }
    
    if(keys.left.pressed && enemy.lastkey==='left' && enemy.position.x>5){
        enemy.velocity.x=-5
        enemy.switchsprite('run')
    }
    else if(keys.right.pressed && enemy.lastkey==='right' && enemy.position.x<1190){
        enemy.velocity.x=5
        enemy.switchsprite('back')
    }else{
        if(enemy.dirkey==='right'){
            enemy.switchsprite('leftidle')
        }else{
        enemy.switchsprite('idle')
    }
}
    if (enemy.velocity.y<0){
        if(enemy.dirkey==='right'){
            enemy.switchsprite('leftjump')
        }else{        
         enemy.switchsprite('jump')
        }
    }else if(enemy.velocity.y>0){
        if(enemy.dirkey==='right'){
            enemy.switchsprite('leftfall')
        }else{        
            enemy.switchsprite('fall') 
        }
        
    }
    

    if(collision({
        player1:player,
        player2:enemy
    })){

        if(player.powerattack && player.framescurrent===4 && player.dirkey==='d'){
            player.powerattack=false
            enemy.powerhit()
        }else if(player.powerattack && player.framescurrent===1 && player.dirkey==='a'){
            player.powerattack=false
            enemy.powerhit()
        }
        if(player.isattacking && player.framescurrent===4){
          player.isattacking=false
          enemy.takeHit()
        }else if(player.isattacking && player.framescurrent===1 && player.dirkey==='a'){
            player.isattacking=false
            enemy.takeHit()
        }
          
          gsap.to('#enemyhealth',{
              width: enemy.health+'%'
          })
        
    }
    if(player.isattacking && player.framescurrent===4){
        player.isattacking=false
    }
    if(player.powerattack && player.framescurrent===4){
        player.powerattack=false
    }

    if(collision({
        player1:enemy,
        player2:player
    })){
        if(enemy.powerattack && enemy.framescurrent===2)
        {
            enemy.powerattack=false
            player.powerhit()
        }
        if(enemy.isattacking && enemy.framescurrent===2)
        {
            enemy.isattacking=false
        player.takeHit()
        }
        gsap.to('#playerhealth',{
            width: player.health+'%'
        })
        
    }
    if(enemy.isattacking && enemy.framescurrent===2){
        enemy.isattacking=false
    }
    if(enemy.powerattack && enemy.framescurrent===2)
        {
            enemy.powerattack=false
        }
    if(player.health===0 || enemy.health===0){
        winner({player,enemy,timeid})
    }

}

animate()

window.addEventListener('keydown',(event)=>{
 if(!player.dead && !player.leftdead){
    switch(event.key){
        case 'd':
            keys.d.pressed=true
            player.lastkey='d'
            player.dirkey='d'
            break
        case 'a':
            keys.a.pressed=true
            player.lastkey='a'
            player.dirkey='a'
            break
        case 'w':
            player.velocity.y=-10
        
                break
        case ' ':
            player.attack()
            break
        case 's':
            player.attackpow()
            break
                
        
    }
}
    if(!enemy.dead && !enemy.leftdead){
        switch(event.key){
            case 'ArrowUp':
            
                enemy.velocity.y=-10
                break
        case 'ArrowLeft':
                keys.left.pressed=true
                enemy.lastkey='left'
                enemy.dirkey='left'
                break
        case 'ArrowRight':
                keys.right.pressed=true
                enemy.lastkey='right'
                enemy.dirkey='right'
                break
        case 'ArrowDown':
            enemy.attack()
            break
        case '/':
            enemy.attackpow()
            break

        }
    }
})
window.addEventListener('keyup',(event)=>{
    switch(event.key){
        case 'd':
            keys.d.pressed=false
            
            break
        case 'a':
            keys.a.pressed=false

            break
        case 'w':
                player.velocity.y=gravity
                break
        case 'ArrowUp':
                    enemy.velocity.y=gravity
                    
                    break
        case 'ArrowLeft':
                    keys.left.pressed=false
                
                    break
        case 'ArrowRight':
                    keys.right.pressed=false
    
                    break
        
    }
})
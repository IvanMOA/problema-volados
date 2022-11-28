class Cartera {
    constructor(public total = 0) {
    }
    ingresar(cantidad: number): void {
        this.total += cantidad
    }
    quitar(cantidad: number): void {
        this.total -= cantidad
    }
    get estaEnQuiebra(): boolean {
        return this.total <= 0
    }
}
class FilaVolados {
    public gano?: boolean
    public llegoALaMeta?: boolean
    public cantidadAntes?: number
    public cantidadDespues?: number
    public numeroAleartorio?: number
    constructor(public numeroDeCorrida: number, public apuesta: number) {
    }
    calcularSiGano(meta: number, cartera: Cartera): void {
        this.cantidadAntes = cartera.total
        this.numeroAleartorio = parseFloat(Math.random().toFixed(5))
        this.gano = this.numeroAleartorio <= 0.5
        if (this.gano) {
            cartera.ingresar(this.apuesta)
        } else {
            cartera.quitar(this.apuesta)
        }
        this.cantidadDespues = cartera.total
        this.llegoALaMeta = cartera.total >= meta
    }
}
export function calcularVolados(
    totalNumerosAleartorios: number,
    meta: number,
    cantidadInicial: number,
    apuesta: number
){
    const numerosAleartorios = new Array(totalNumerosAleartorios).fill("placeholder").map(() => Math.random())
    let filas: FilaVolados[] = []
    const cartera = new Cartera(cantidadInicial)
    let numeroDeCorrida = 1
    function reiniciarJuego(){
        cartera.total = cantidadInicial
        apuesta = 10
    }
    for (const numeroAleartorio of numerosAleartorios.entries()) {
        const fila = new FilaVolados(numeroDeCorrida, apuesta)
        fila.calcularSiGano(meta, cartera)
        filas.push(fila)
        if(!fila.gano){
            apuesta = apuesta * 2
        }
        if(fila.llegoALaMeta || cartera.estaEnQuiebra){
            numeroDeCorrida += 1
            reiniciarJuego()
        }
    }
    return filas
}
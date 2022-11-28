<script setup lang="ts">
import {reactive, ref} from "vue";
import {ElTable, ElTableColumn, ElForm, ElFormItem, ElInput, ElButton} from "element-plus"
import {calcularVolados} from "@/volados";
const integrantes = [
	{name: 'Axel Ivan Morales Ortega', enrollment: '1911084'},
	{name: 'Devany Magaly Flores López', enrollment: '1918077'},
	{name: 'Jose Angel Nambo Moreno', enrollment: '1850769'},
	{name: 'Alejandro Abeldano Rodriguez', enrollment: '1911151'},
	{name: 'Erick Brandon Garcia Castillo', enrollment: '1796004'},
	{name: 'Emiliano Juan Garcia Garcia', enrollment: '1922887'},
	{name: 'Kevin Alan Correa García', enrollment: '1905149'},
	{name: 'Luisa Fernanda Salazar Mauricio', enrollment: '1918943'},
	{name: 'Daniel Jafet De León Nolazco', enrollment: '1918943'},
	{name: 'Edgar Iván Hernández Hernández', enrollment: '1814860'},
]
const form = reactive({
	totalNumerosAleartorios: "20",
	meta: "80",
	cantidadInicial: "50",
	apuesta: "10"
})
const filas = ref(calcularVolados(
	parseInt(form.totalNumerosAleartorios, 10),
	parseInt(form.meta, 10),
	parseInt(form.cantidadInicial, 10),
	parseInt(form.apuesta, 10),
))
function reCalcularVolados() {
	console.log(form)
	filas.value = calcularVolados(
		parseInt(form.totalNumerosAleartorios, 10),
		parseInt(form.meta, 10),
		parseInt(form.cantidadInicial, 10),
		parseInt(form.apuesta, 10),
	)
}
</script>
<template>
	<div class="flex flex-col justify-center items-center md:p-16 lg:p-20">
		<div class="flex flex-col items-center mb-20">
			<h1 class="text-2xl font-bold text-gray-700 uppercase text-center">Modelado y Simulación de Sistemas - PIA</h1>
			<h1 class="text-xl font-bold text-gray-600 text-center">Volados</h1>
			<h1 class="text-xl font-bold text-gray-600 mt-8">INTEGRANTES</h1>
			<el-table :data="integrantes" stripe style="width: 100%">
				<el-table-column prop="name" label="Nombre"/>
				<el-table-column prop="enrollment" label="Matrícula"/>
			</el-table>
		</div>
		<ElForm  :model="form" label-width="150px">
			<ElFormItem label="Total números aleartorios">
				<ElInput type="number" v-model="form.totalNumerosAleartorios"/>
			</ElFormItem>
			<ElFormItem label="Meta">
				<ElInput type="number" v-model="form.meta"/>
			</ElFormItem>
			<ElFormItem label="Cantidad inicial">
				<ElInput type="number" v-model="form.cantidadInicial"/>
			</ElFormItem>
			<ElFormItem label="Apuesta">
				<ElInput type="number" v-model="form.apuesta"/>
			</ElFormItem>
		</ElForm>
		<ElButton @click="reCalcularVolados" class="mb-12" >Re calcular</ElButton>
		<div>
			<el-table :data="filas" stripe style="width: 100%">
				<el-table-column prop="numeroDeCorrida" label="Número de corrida"/>
				<el-table-column prop="cantidadAntes" label="Dinero antes del volado"/>
				<el-table-column prop="apuesta" label="Apuesta"/>
				<el-table-column prop="numeroAleartorio" label="Número aleartorio"/>
				<el-table-column prop="gano" label="Ganó"/>
				<el-table-column prop="cantidadDespues" label="Dinero después"/>
				<el-table-column prop="llegoALaMeta" label="Llegó a la meta"/>
			</el-table>
		</div>
	</div>
</template>
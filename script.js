var _$ = jQuery.noConflict();

var precios_productos = {
    "pizza": 10000,
    "hamburguesa": 12000,
    "perro": 7000,
    "sandwich": 8500,
    "bebida": 4000
};

var registros = [];

//Esperar que la página esté lista
_$(function(){

    _$('input[type=radio][name=todos_piden]').change(function() {
        var selectionRadio = _$("input[name=todos_piden]:checked").val();
        if (selectionRadio === 'si'){
            _$('#producto_persona').removeAttr('disabled');
            _$('label[for="producto_persona"]').show();
            _$('#producto_persona').show();
        } else {
            _$('label[for="producto_persona"]').hide();
            // _$('#producto_persona').attr('disabled', 'disabled');
            _$('#producto_persona').hide();
        }
    });

    _$("#submit_button").click(function(e){
        var table = _$('#tabla');
        let numero_personas = parseInt(_$("#num_personas").val());
        var selectionRadio = _$("input[name=todos_piden]:checked").val();
        for (let index = 0; index < numero_personas; index++) {

            var registro = {
                "nombre": '<input type="text" name="nombre" value="" style="width:90%">',
                "producto": "",
                "incluir_bebida": '<select class="incluir_bebida_registro" name="incluir_bebida"> ' +
                ' <option value="si">Si</option>'+
                ' <option value="no">No</option></select>',
                "valor_bebida": 4000,
                "valor_por_persona": 0
            };
            if (selectionRadio === "si"){
                registro.producto = _$("#producto_persona").val();
            } else {
                registro.producto = '<select class="producto_persona_registro" name="producto_persona_reg"> '+
                ' <option value="pizza">Pizza</option>'+
                ' <option value="hamburguesa">Hamburguesa</option>'+
                ' <option value="perro">Perro</option>'+
                ' <option value="sandwich">Sandwich</option>'+
            ' </select>';
            }
            var fila = '<tr id="row">';
            fila += "<td>"+ registro.nombre +"</td>";
            fila += "<td>"+ registro.producto + "</td>";
            fila += "<td>" + registro.incluir_bebida + "</td>";
            fila += "<td class='valor_bebida'>" + registro.valor_bebida + "</td>";
            fila += "<td class='total_persona'>" + registro.valor_por_persona + "</td>";
            fila += '<td><button class="eliminar" data-indice="">Eliminar</button></td>';
            fila += "</tr>";
            table.append(fila)
        }
        e.preventDefault();
        _$("#btn-agregar-persona").show();
    });

    _$("#btn-agregar-persona").click(function(){
        var registro = {
            "nombre": '<input type="text" name="nombre" value="" style="width:90%">',
            "producto": "",
            "incluir_bebida": '<select class="incluir_bebida_registro" name="incluir_bebida"> ' +
            ' <option value="si">Si</option>'+
            ' <option value="no">No</option></select>',
            "valor_bebida": 4000,
            "valor_por_persona": 0
        };
        registro.producto = '<select class="producto_persona_registro" name="producto_persona_reg"> '+
        ' <option value="pizza">Pizza</option>'+
        ' <option value="hamburguesa">Hamburguesa</option>'+
        ' <option value="perro">Perro</option>'+
        ' <option value="sandwich">Sandwich</option>'+
        ' </select>';

        var fila = '<tr id="row">';
        fila += "<td>"+ registro.nombre +"</td>";
        fila += "<td>"+ registro.producto + "</td>";
        fila += "<td>" + registro.incluir_bebida + "</td>";
        fila += "<td class='valor_bebida'>" + registro.valor_bebida + "</td>";
        fila += "<td class='total_persona'>" + registro.valor_por_persona + "</td>";
        fila += '<td><button class="eliminar" data-indice="">Eliminar</button></td>';
        fila += "</tr>";
        _$('#tabla').append(fila);
    });

    _$(document).on('change', 'select.incluir_bebida_registro, select.producto_persona_registro', function(e){
        e.preventDefault();
        // Obtener la fila correspondiente
        var fila = _$(this).closest('tr');

        var incluir_bebida = fila.find('select.incluir_bebida_registro').val();       
        var producto_elegido = fila.find('select.producto_persona_registro').val();
        var valor_prod = precios_productos[producto_elegido];
        
        if(incluir_bebida === "si"){
            fila.find('td.valor_bebida').text(4000);
        } else{
            fila.find('td.valor_bebida').text(0);       
        }
        
        var valor_bebida = parseFloat(fila.find('td.valor_bebida').text());
        var total_per = valor_prod + valor_bebida;
        fila.find('td.total_persona').text(total_per);
    });


    //Escuchar los botones para eliminar las filas
    _$(document).on('click','.eliminar', function(event){
        event.preventDefault();
        _$(this).closest('tr').remove();
    });

});

$(document).ready(function () {
//    $(function () {
    var dropZone = $('#dropZone'),
        fileFormat = 'fb2',
        maxFileSize = 1000000; // максимальный размер файла - 1 мб.

    // Проверка поддержки браузером
    if (typeof(window.FileReader) == 'undefined') {
        dropZone.text('Не поддерживается браузером!');
        dropZone.addClass('error');
    }

    // Добавляем класс hover при наведении
    dropZone[0].ondragover = function () {
        dropZone.addClass('hover');
        return false;
    };

    // Убираем класс hover
    dropZone[0].ondragleave = function () {
        dropZone.removeClass('hover');
        return false;
    };

    // Обрабатываем событие Drop
    dropZone[0].ondrop = function (event) {
        event.preventDefault();
        dropZone.removeClass('hover');
        dropZone.addClass('drop');

        var file = event.dataTransfer.files[0];

        // Проверяем размер файла
        if (file.size > maxFileSize) {
            dropZone.text('Файл слишком большой!');
            dropZone.addClass('error');
            return false;
        }

        // Проверяем формат
        //if (file.type != fileFormat) {
        if (file.name.split('.').reverse()[0] != fileFormat) {
            dropZone.text('Только формат fb2!');
            dropZone.addClass('error');
            return false;
        }

        // Создаем запрос
        var xhr = new XMLHttpRequest();
        xhr.upload.addEventListener('progress', uploadProgress, false);
        xhr.onreadystatechange = stateChange;
        xhr.open('POST', 'js/upload.php');
        xhr.setRequestHeader('X-FILE-NAME', file.name);
        xhr.send(file);


        //console.log("формат: " + file.name.split('.').reverse()[0]);
    };

    // Показываем процент загрузки
    function uploadProgress(event) {
        var percent = parseInt(event.loaded / event.total * 100);
        dropZone.text('Загрузка: ' + percent + '%');
    }

    // Пост обрабочик
    function stateChange(event) {
        if (event.target.readyState == 4) {
            if (event.target.status == 200) {
                dropZone.text('Загрузка успешно завершена!');
            } else {
                dropZone.text('Произошла ошибка!');
                dropZone.addClass('error');
            }
        }
    }




    //function handleFileSelect(evt) {
    //    evt.stopPropagation();
    //    evt.preventDefault();
    //
    //    var files = evt.dataTransfer.files; // FileList object.
    //
    //    // files is a FileList of File objects. List some properties.
    //    var output = [];
    //    for (var i = 0, f; f = files[i]; i++) {
    //        output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
    //            f.size, ' bytes, last modified: ',
    //            f.lastModifiedDate.toLocaleDateString(), '</li>');
    //    }
    //    document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
    //}
    //
    //function handleDragOver(evt) {
    //    evt.stopPropagation();
    //    evt.preventDefault();
    //    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
    //}
    //
    //// Setup the dnd listeners.
    //var dropZone = document.getElementById('drop_zone');
    //dropZone.addEventListener('dragover', handleDragOver, false);
    //dropZone.addEventListener('drop', handleFileSelect, false);

});


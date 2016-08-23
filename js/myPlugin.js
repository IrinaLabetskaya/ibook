(function( $ ) {
    $.fn.myPlugin = function( options ) {

        var options = $.extend( {
            fileFormat : 'fb2',
            maxFileSize : '1000000'// максимальный размер файла - 1 мб.
        }, options);

        // Тут пишем функционал нашего плагина
        //var dropZone = $('#dropZone'),
        //    fileFormat = 'fb2',
        //    maxFileSize = 1000000;

        //var $this = $(this);
        var dropZone = this;

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

        console.log("???: " +  this[0]);

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
            if (file.size > options.maxFileSize) {
                dropZone.text('Файл слишком большой!');
                dropZone.addClass('error');
                return false;
            }

            // Проверяем формат
            if (file.name.split('.').reverse()[0] != options.fileFormat) {
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
        //return this;

    };
})(jQuery);


//$(document).ready(function () {
//
//    var dropZone = $('#dropZone'),
//        fileFormat = 'fb2',
//        maxFileSize = 1000000; // максимальный размер файла - 1 мб.
//
//    // Проверка поддержки браузером
//    if (typeof(window.FileReader) == 'undefined') {
//        dropZone.text('Не поддерживается браузером!');
//        dropZone.addClass('error');
//    }
//
//    // Добавляем класс hover при наведении
//    dropZone[0].ondragover = function () {
//        dropZone.addClass('hover');
//        return false;
//    };
//
//    // Убираем класс hover
//    dropZone[0].ondragleave = function () {
//        dropZone.removeClass('hover');
//        return false;
//    };
//
//    // Обрабатываем событие Drop
//    dropZone[0].ondrop = function (event) {
//        event.preventDefault();
//        dropZone.removeClass('hover');
//        dropZone.addClass('drop');
//
//        var file = event.dataTransfer.files[0];
//
//        // Проверяем размер файла
//        if (file.size > maxFileSize) {
//            dropZone.text('Файл слишком большой!');
//            dropZone.addClass('error');
//            return false;
//        }
//
//        // Проверяем формат
//        if (file.name.split('.').reverse()[0] != fileFormat) {
//            dropZone.text('Только формат fb2!');
//            dropZone.addClass('error');
//            return false;
//        }
//
//        // Создаем запрос
//        var xhr = new XMLHttpRequest();
//        xhr.upload.addEventListener('progress', uploadProgress, false);
//        xhr.onreadystatechange = stateChange;
//        xhr.open('POST', 'js/upload.php');
//        xhr.setRequestHeader('X-FILE-NAME', file.name);
//        xhr.send(file);
//
//        //console.log("формат: " + file.name.split('.').reverse()[0]);
//    };
//
//    // Показываем процент загрузки
//    function uploadProgress(event) {
//        var percent = parseInt(event.loaded / event.total * 100);
//        dropZone.text('Загрузка: ' + percent + '%');
//    }
//
//    // Пост обрабочик
//    function stateChange(event) {
//        if (event.target.readyState == 4) {
//            if (event.target.status == 200) {
//                dropZone.text('Загрузка успешно завершена!');
//            } else {
//                dropZone.text('Произошла ошибка!');
//                dropZone.addClass('error');
//            }
//        }
//    }
//
//});


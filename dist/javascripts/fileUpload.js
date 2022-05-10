FilePond.registerPlugin(
    FilePondPluginImagePreview,
    FilePondPluginImageResize,
    FilePondPluginFileEncode,
)

FilePond.setOptions({
    stylePanelAspectRatio: 0.75,
    imageResizeTargetWidth: 200,
    imageResizeTargetHeight: 267
})

FilePond.parse(document.body);

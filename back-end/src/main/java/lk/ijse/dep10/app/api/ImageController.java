package lk.ijse.dep10.app.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriBuilder;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.Part;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/images")
public class ImageController {

    @Autowired
    private ServletContext servletContext;

    @GetMapping
    public List<String> getAllImages(UriComponentsBuilder uriBuilder){
        ArrayList<String> imageFileList = new ArrayList<>();
        var imgPath = servletContext.getRealPath("/images");
        var file = new File(imgPath);
        var list = file.list();
        for (String s : list) {
            var builder = uriBuilder.cloneBuilder();
            var build = builder.pathSegment("images", s).toUriString();
            imageFileList.add(build);
        }
        return imageFileList;
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public List<String> saveImages(@RequestPart("images")List<Part> imageFiles,UriComponentsBuilder uriBuilder){
        List<String> imageUrlList = new ArrayList<>();
        if (imageFiles!=null){
            String imgDirPath = servletContext.getRealPath("/images");
            for (Part imageFile : imageFiles) {
                String imageFilePath = new File(imgDirPath, imageFile.getSubmittedFileName()).getAbsolutePath();
                try {
                    imageFile.write(imageFilePath);
                    UriComponentsBuilder cloneBuilder = uriBuilder.cloneBuilder();
                    String imageUrl = cloneBuilder.pathSegment("images", imageFile.getSubmittedFileName()).toUriString();
                    imageUrlList.add(imageUrl);

                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
        }

        return imageUrlList;

    }
}

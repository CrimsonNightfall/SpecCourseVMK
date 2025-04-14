package ru.msu.speccoursevmk.controller;


import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import ru.msu.speccoursevmk.tools.ResourceUtils;
import springfox.documentation.annotations.ApiIgnore;

@Slf4j
@ApiIgnore
@Controller
public class MainController {
    @RequestMapping(value = { "/*", "/store/*", "/user/*" })
    public String redirectToMain(Model model) {
        long jsBundleLastModified = ResourceUtils.getLastModified("/static/build/speccourse/speccourse.bundle.js");
        long cssBundleLastModified = ResourceUtils.getLastModified("/static/build/speccourse/speccourse.css");
        model.addAttribute("jsBundleUrl", "/build/speccourse/speccourse.bundle.js?v=" + jsBundleLastModified);
        model.addAttribute("cssBundleUrl", "/build/speccourse/speccourse.css?v=" + cssBundleLastModified);
        return "hello";
    }
}

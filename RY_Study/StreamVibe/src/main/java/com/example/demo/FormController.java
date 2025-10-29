package com.example.demo;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.mapper.UserMapper;

import java.util.Map;

@AllArgsConstructor
@Validated
@RestController
@RequestMapping("/api")
public class FormController {

    private final UserRepository userRepository;

    private final UserMapper userMapper;

    @PostMapping("/submit")
    public ResponseEntity<Map<String, String>> handleSubmit(@Valid @RequestBody UserFormRequest request) {
        try {
            userRepository.save(userMapper.toUserFromUserFormRequest(request));

            return ResponseEntity.ok(Map.of(
                    "status", "success",
                    "message", "Дані збережено успішно"));
        } catch (Exception e) {
            return ResponseEntity.status(500)
                    .body(Map.of("error", "Помилка збереження: " + e.getMessage()));
        }
    }

    public record UserFormRequest(
            @NotBlank String name,
            @NotBlank String surname,
            @Email String email,
            @Pattern(regexp = "^\\+?[0-9]{10,15}$") String phone,
            boolean checkbox,
            @Size(max = 500) String message) {
    }
}
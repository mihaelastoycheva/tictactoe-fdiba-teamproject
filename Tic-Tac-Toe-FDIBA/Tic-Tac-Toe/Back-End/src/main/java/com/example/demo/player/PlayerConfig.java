package com.example.demo.player;

import com.example.demo.repository.PlayerRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class PlayerConfig {
    @Bean
    CommandLineRunner commandLineRunner(PlayerRepository repository) {
        return args -> {
            Player pesho = new Player(
                    1,
                    "Pesho"
            );
            Player gosho = new Player(
                    "Gosho"
            );

            repository.saveAll(List.of(pesho, gosho));
        };
    }
}

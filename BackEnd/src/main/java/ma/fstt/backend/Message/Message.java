package ma.fstt.backend.Message;


import jakarta.persistence.*;
import lombok.*;
import ma.fstt.backend.User.User;

@Data
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "message")
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String content;
    private String timestamp;
    private String Sender;
    private String Receiver;

}

package ma.fstt.backend.Contact;


import jakarta.persistence.*;
import lombok.*;
import ma.fstt.backend.User.User;

@Data
@Getter
@Setter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "contact")
public class Contact {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;
    private String username;

    @ManyToOne
    @JoinColumn(name="id_user")
    private User user;

}

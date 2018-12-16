package com.agathevaisse.biscuits.domain.kid;

import com.agathevaisse.biscuits.domain.authentication.user.User;

import java.util.Objects;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class Kid {
    private Long id;

    @NotBlank
    @Size(min = 3, max = 50)
    private String nickname;
    private String imageURL;
    private int biscuitsEarned;
    
    @NotBlank
    private User user;

    public Kid() {
    }

    public Kid(String nickname, User user) {
        this.nickname = nickname;
        this.imageURL = "src/main/biscuits-ui/src/assets/images/secret-agent-stamp.jpg";
        this.biscuitsEarned = 0;
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getImageURL() {
        return imageURL;
    }

    public void setImageURL() {
        this.imageURL = "src/main/biscuits-ui/src/assets/images/secret-agent-stamp.jpg";
    }

    public int getBiscuitsEarned() {
        return biscuitsEarned;
    }

    public void setBiscuitsEarned(int biscuitsEarned) {
        this.biscuitsEarned = biscuitsEarned;
    }

    public void setImageURL(String imageURL) {
        this.imageURL = imageURL;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Kid)) return false;
        Kid kid = (Kid) o;
        return getBiscuitsEarned() == kid.getBiscuitsEarned() &&
                Objects.equals(getId(), kid.getId()) &&
                Objects.equals(getNickname(), kid.getNickname()) &&
                Objects.equals(getImageURL(), kid.getImageURL());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getNickname(), getImageURL(), getBiscuitsEarned());
    }

    @Override
    public String toString() {
        return "Kid{" +
                "id=" + id +
                ", nickName='" + nickname + '\'' +
                ", imageURL='" + imageURL + '\'' +
                ", biscuitsEarned=" + biscuitsEarned +
                '}';
    }
}
